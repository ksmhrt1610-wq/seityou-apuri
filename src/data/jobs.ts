import type { JobInfo } from '../types'

/** Character level required before a job change or evolution becomes available. */
export const EVOLUTION_LEVEL = 10

export const JOBS: JobInfo[] = [
  // ---- tier 1: starting jobs (assigned at random on onboarding) ----
  {
    id: 'swordsman',
    name: '剣士',
    emblem: '🗡️',
    rarity: 'common',
    tier: 1,
    affinities: ['STR'],
    description: '鍛えた肉体で道を切り拓く。筋力系クエストが得意分野。',
    advancesTo: 'sword-saint',
  },
  {
    id: 'guardian',
    name: '守護騎士',
    emblem: '🛡️',
    rarity: 'common',
    tier: 1,
    affinities: ['VIT'],
    description: '己を律し、健やかな身体を保つ。体力系クエストが得意分野。',
    advancesTo: 'silver-knight',
  },
  {
    id: 'mage',
    name: '魔道士',
    emblem: '🔮',
    rarity: 'common',
    tier: 1,
    affinities: ['INT'],
    description: '知識を力に変える探究者。知力系クエストが得意分野。',
    advancesTo: 'archmage',
  },
  {
    id: 'priest',
    name: '神官',
    emblem: '✨',
    rarity: 'common',
    tier: 1,
    affinities: ['WIL'],
    description: '心を整え、揺るがぬ意志を持つ。精神力系クエストが得意分野。',
    advancesTo: 'high-priest',
  },
  {
    id: 'bard',
    name: '吟遊詩人',
    emblem: '🎵',
    rarity: 'common',
    tier: 1,
    affinities: ['CHA'],
    description: '人の心を動かす語り部。魅力系クエストが得意分野。',
    advancesTo: 'legendary-bard',
  },
  {
    id: 'thief',
    name: '盗賊',
    emblem: '🗝️',
    rarity: 'common',
    tier: 1,
    affinities: ['DEX'],
    description: '手先の器用さと機転が持ち味。器用系クエストが得意分野。',
    advancesTo: 'phantom-thief',
  },

  // ---- tier 2: advanced (non-unique) jobs, reached only via evolution ----
  {
    id: 'sword-saint',
    name: '剣聖',
    emblem: '⚔️',
    rarity: 'common',
    tier: 2,
    affinities: ['STR'],
    description: '剣士としての研鑽が極みに達した上位職。筋力系クエストの恩恵がさらに大きい。',
  },
  {
    id: 'silver-knight',
    name: '白銀騎士',
    emblem: '🛡️',
    rarity: 'common',
    tier: 2,
    affinities: ['VIT'],
    description: '守護騎士の頂点に立つ上位職。体力系クエストの恩恵がさらに大きい。',
  },
  {
    id: 'archmage',
    name: '大魔導士',
    emblem: '🔮',
    rarity: 'common',
    tier: 2,
    affinities: ['INT'],
    description: '魔道を極めた上位職。知力系クエストの恩恵がさらに大きい。',
  },
  {
    id: 'high-priest',
    name: '大神官',
    emblem: '✨',
    rarity: 'common',
    tier: 2,
    affinities: ['WIL'],
    description: '神官としての境地を極めた上位職。精神力系クエストの恩恵がさらに大きい。',
  },
  {
    id: 'legendary-bard',
    name: '伝説の吟遊詩人',
    emblem: '🎵',
    rarity: 'common',
    tier: 2,
    affinities: ['CHA'],
    description: '語り継がれる吟遊詩人の上位職。魅力系クエストの恩恵がさらに大きい。',
  },
  {
    id: 'phantom-thief',
    name: '怪盗',
    emblem: '🗝️',
    rarity: 'common',
    tier: 2,
    affinities: ['DEX'],
    description: '盗賊としての技を極めた上位職。器用系クエストの恩恵がさらに大きい。',
  },

  // ---- tier 2: unique jobs — obtainable only through evolution, never selectable directly ----
  {
    id: 'sage',
    name: '賢者',
    emblem: '🧙',
    rarity: 'rare',
    tier: 2,
    affinities: ['INT', 'WIL'],
    description: '知恵と精神を極めたユニークジョブ。知力・精神力クエストで真価を発揮する。',
  },
  {
    id: 'dragoon',
    name: '竜騎士',
    emblem: '🐉',
    rarity: 'rare',
    tier: 2,
    affinities: ['STR', 'VIT'],
    description: '竜と契りを結んだ稀少なユニークジョブ。筋力・体力クエストに秀でる。',
  },
  {
    id: 'paladin',
    name: '聖騎士',
    emblem: '⚜️',
    rarity: 'rare',
    tier: 2,
    affinities: ['STR', 'WIL'],
    description: '力と信念を併せ持つユニークジョブ。筋力・精神力クエストに秀でる。',
  },
  {
    id: 'alchemist',
    name: '錬金術師',
    emblem: '⚗️',
    rarity: 'rare',
    tier: 2,
    affinities: ['INT', 'DEX'],
    description: '知識と手技を融合させるユニークジョブ。知力・器用クエストに秀でる。',
  },
]

export const JOB_MAP: Record<string, JobInfo> = Object.fromEntries(JOBS.map((j) => [j.id, j]))

export function getJob(jobId: string): JobInfo {
  return JOB_MAP[jobId] ?? JOBS[0]
}

export const TIER1_JOBS = JOBS.filter((j) => j.tier === 1)
const TIER2_UNIQUE_JOBS = JOBS.filter((j) => j.tier === 2 && j.rarity === 'rare')

/** Common jobs are far more likely than the rare/unique ones. */
export function pickRandomJob(): JobInfo {
  const isRare = Math.random() < 0.1
  const pool = isRare ? TIER2_UNIQUE_JOBS : TIER1_JOBS
  return pool[Math.floor(Math.random() * pool.length)]
}

/**
 * Evolves a tier-1 job into its tier-2 form. Mostly resolves to the job's
 * own natural advanced form; a smaller chance goes to one of the unique
 * jobs that shares an affinity with it — this is the *only* way a unique
 * job can be obtained, never a direct player choice.
 */
export function evolveJob(current: JobInfo): JobInfo {
  const natural = current.advancesTo ? getJob(current.advancesTo) : current
  const matchingUniques = TIER2_UNIQUE_JOBS.filter((u) =>
    u.affinities.some((a) => current.affinities.includes(a)),
  )
  if (matchingUniques.length === 0) return natural

  const uniqueChanceTotal = 0.3
  const roll = Math.random()
  if (roll >= uniqueChanceTotal) return natural
  const index = Math.floor((roll / uniqueChanceTotal) * matchingUniques.length)
  return matchingUniques[Math.min(index, matchingUniques.length - 1)]
}

export const JOB_BONUS_MULTIPLIER = 1.2
export const JOB_BONUS_MULTIPLIER_TIER2 = 1.35
