export type Category = 'STR' | 'VIT' | 'INT' | 'WIL' | 'CHA' | 'DEX'

export type Rank = 'F' | 'E' | 'D' | 'C' | 'B' | 'A' | 'S'

export type Intensity = 'low' | 'mid' | 'high'

export type QuestKind = 'daily' | 'special'

export interface CategoryInfo {
  key: Category
  label: string
  short: string
  description: string
  color: string
}

export interface QuestTemplate {
  id: string
  kind: QuestKind
  category: Category
  rank: Rank
  intensity: Intensity
  title: string
  description: string
  estMinutes: number
  /** Item id (see data/items.ts). If set, this quest only appears when the player owns the item. */
  requiredItem?: string
  /** Job id (see data/jobs.ts). If set, this quest only appears for players currently in that job. */
  requiredJob?: string
}

export type QuestStatus = 'active' | 'completed' | 'abandoned'

export interface QuestInstance {
  instanceId: string
  templateId: string | null
  kind: QuestKind
  category: Category
  rank: Rank
  intensity: Intensity
  title: string
  description: string
  estMinutes: number
  /** Base reward, before any job-affinity bonus is applied. */
  xpReward: number
  statReward: number
  isCustom: boolean
  status: QuestStatus
  addedAt: string
  completedAt?: string
}

export interface HistoryEntry {
  id: string
  instanceId: string
  templateId: string | null
  title: string
  description: string
  category: Category
  rank: Rank
  kind: QuestKind
  intensity: Intensity
  xpGained: number
  statGained: number
  completedAt: string
  isCustom: boolean
}

export interface PersonalizeSettings {
  adventurerName: string
  interests: Category[]
  intensity: Intensity
  dailyQuestCount: number
  onboarded: boolean
}

export interface CharacterState {
  totalXp: number
  stats: Record<Category, number>
  streakDays: number
  longestStreak: number
  lastCompletionDate: string | null
  jobId: string
  /** Unlocked skill tree node ids (see data/skillTree.ts). */
  skillNodes: string[]
  /** Cleared the Lv.10 昇級試練, unlocking job change / tier-1→2 evolution. */
  evolutionTrialCleared: boolean
  /** Cleared the Lv.20 昇級試練, unlocking a unique job's tier-2→3 evolution. */
  grandTrialCleared: boolean
}

export type JobRarity = 'common' | 'rare' | 'legendary'

export interface JobInfo {
  id: string
  name: string
  emblem: string
  rarity: JobRarity
  /** 1 = starting job. 2 = advanced/unique, via evolution. 3 = a unique job's final form. */
  tier: 1 | 2 | 3
  /** Categories this job is good at; quests in these categories earn a reward bonus. */
  affinities: Category[]
  description: string
  /** Tier-1 only: the id of the non-unique advanced job this naturally evolves into. */
  advancesTo?: string
  /** Tier-2 unique jobs only: the id of this job's tier-3 final form. */
  advancesToGrand?: string
}

export interface ItemInfo {
  id: string
  label: string
  icon: string
  category: Category
}
