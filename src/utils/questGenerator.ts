import { QUEST_TEMPLATES } from '../data/questTemplates'
import { CATEGORY_LIST } from '../data/categories'
import type { PersonalizeSettings, QuestInstance, QuestTemplate } from '../types'
import { computeReward, RANK_ORDER } from './xp'
import { newId } from './id'

/**
 * As the character grows, quests that were once appropriately challenging
 * become trivial — this raises the minimum rank preferred for the daily
 * board so low-rank quests gradually stop appearing. Never a hard cutoff:
 * callers fall back to the full pool if a category runs dry.
 */
export function minDailyRankIndexForLevel(level: number): number {
  if (level >= 35) return RANK_ORDER.indexOf('C')
  if (level >= 20) return RANK_ORDER.indexOf('D')
  if (level >= 10) return RANK_ORDER.indexOf('E')
  return 0
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

export function instantiateTemplate(template: QuestTemplate, isCustom = false): QuestInstance {
  const reward = computeReward(template.rank, template.intensity)
  return {
    instanceId: newId('quest'),
    templateId: template.id,
    kind: template.kind,
    category: template.category,
    rank: template.rank,
    intensity: template.intensity,
    title: template.title,
    description: template.description,
    estMinutes: template.estMinutes,
    xpReward: reward.xp,
    statReward: reward.stat,
    isCustom,
    status: 'active',
    addedAt: new Date().toISOString(),
  }
}

export interface GenerateDailyQuestsOptions {
  recentTemplateIds?: Set<string>
  ownedItems?: Set<string>
  jobId?: string
  /** Template ids to leave out entirely, e.g. ones already pinned as resident quests today. */
  excludeTemplateIds?: Set<string>
  /** Character level — raises the preferred minimum quest rank as it grows. */
  level?: number
}

/**
 * Picks daily quests, round-robining across the player's interest
 * categories (or all categories, if none chosen) so a multi-interest
 * player sees balanced growth instead of a run of luck landing on one
 * category. Within each category it prefers the configured intensity and
 * avoids recently-seen templates, falling back gracefully when a
 * category's pool is exhausted.
 */
export function generateDailyQuests(
  settings: PersonalizeSettings,
  count: number,
  options: GenerateDailyQuestsOptions = {},
): QuestInstance[] {
  const {
    recentTemplateIds = new Set<string>(),
    ownedItems = new Set<string>(),
    jobId,
    excludeTemplateIds = new Set<string>(),
    level = 1,
  } = options

  const dailyPool = QUEST_TEMPLATES.filter(
    (t) =>
      t.kind === 'daily' &&
      !excludeTemplateIds.has(t.id) &&
      (!t.requiredItem || ownedItems.has(t.requiredItem)) &&
      (!t.requiredJob || t.requiredJob === jobId),
  )
  const minRankIndex = minDailyRankIndexForLevel(level)
  const preferredPool = dailyPool.filter((t) => RANK_ORDER.indexOf(t.rank) >= minRankIndex)
  const categories =
    settings.interests.length > 0 ? settings.interests : CATEGORY_LIST.map((c) => c.key)
  const cycle = shuffle(categories)

  const picked: QuestTemplate[] = []
  const usedIds = new Set<string>()

  function pickFromCategory(cat: (typeof categories)[number], avoidRecent: boolean) {
    const basePool = preferredPool.length > 0 ? preferredPool : dailyPool
    const candidates = basePool.filter(
      (t) => t.category === cat && !usedIds.has(t.id) && (!avoidRecent || !recentTemplateIds.has(t.id)),
    )
    const byIntensity = candidates.filter((t) => t.intensity === settings.intensity)
    const pool = byIntensity.length > 0 ? byIntensity : candidates
    if (pool.length === 0) return null
    return pool[Math.floor(Math.random() * pool.length)]
  }

  let progressed = true
  while (picked.length < count && progressed) {
    progressed = false
    for (const cat of cycle) {
      if (picked.length >= count) break
      const t = pickFromCategory(cat, true) ?? pickFromCategory(cat, false)
      if (t) {
        picked.push(t)
        usedIds.add(t.id)
        progressed = true
      }
    }
  }

  if (picked.length < count) {
    for (const t of shuffle(dailyPool)) {
      if (picked.length >= count) break
      if (usedIds.has(t.id)) continue
      picked.push(t)
      usedIds.add(t.id)
    }
  }

  return picked.map((t) => instantiateTemplate(t))
}
