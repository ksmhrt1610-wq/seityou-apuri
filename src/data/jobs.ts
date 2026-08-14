import type { JobInfo } from '../types'

export const JOBS: JobInfo[] = [
  // ---- common jobs (one per stat) ----
  {
    id: 'swordsman',
    name: '剣士',
    emblem: '🗡️',
    rarity: 'common',
    affinities: ['STR'],
    description: '鍛えた肉体で道を切り拓く。筋力系クエストが得意分野。',
  },
  {
    id: 'guardian',
    name: '守護騎士',
    emblem: '🛡️',
    rarity: 'common',
    affinities: ['VIT'],
    description: '己を律し、健やかな身体を保つ。体力系クエストが得意分野。',
  },
  {
    id: 'mage',
    name: '魔道士',
    emblem: '🔮',
    rarity: 'common',
    affinities: ['INT'],
    description: '知識を力に変える探究者。知力系クエストが得意分野。',
  },
  {
    id: 'priest',
    name: '神官',
    emblem: '✨',
    rarity: 'common',
    affinities: ['WIL'],
    description: '心を整え、揺るがぬ意志を持つ。精神力系クエストが得意分野。',
  },
  {
    id: 'bard',
    name: '吟遊詩人',
    emblem: '🎵',
    rarity: 'common',
    affinities: ['CHA'],
    description: '人の心を動かす語り部。魅力系クエストが得意分野。',
  },
  {
    id: 'thief',
    name: '盗賊',
    emblem: '🗝️',
    rarity: 'common',
    affinities: ['DEX'],
    description: '手先の器用さと機転が持ち味。器用系クエストが得意分野。',
  },

  // ---- rare / unique jobs ----
  {
    id: 'sage',
    name: '賢者',
    emblem: '🧙',
    rarity: 'rare',
    affinities: ['INT', 'WIL'],
    description: '知恵と精神を極めたユニークジョブ。知力・精神力クエストで真価を発揮する。',
  },
  {
    id: 'dragoon',
    name: '竜騎士',
    emblem: '🐉',
    rarity: 'rare',
    affinities: ['STR', 'VIT'],
    description: '竜と契りを結んだ稀少なユニークジョブ。筋力・体力クエストに秀でる。',
  },
  {
    id: 'paladin',
    name: '聖騎士',
    emblem: '⚜️',
    rarity: 'rare',
    affinities: ['STR', 'WIL'],
    description: '力と信念を併せ持つユニークジョブ。筋力・精神力クエストに秀でる。',
  },
  {
    id: 'alchemist',
    name: '錬金術師',
    emblem: '⚗️',
    rarity: 'rare',
    affinities: ['INT', 'DEX'],
    description: '知識と手技を融合させるユニークジョブ。知力・器用クエストに秀でる。',
  },
]

export const JOB_MAP: Record<string, JobInfo> = Object.fromEntries(JOBS.map((j) => [j.id, j]))

export function getJob(jobId: string): JobInfo {
  return JOB_MAP[jobId] ?? JOBS[0]
}

/** Common jobs are far more likely than the rare/unique ones. */
export function pickRandomJob(): JobInfo {
  const commons = JOBS.filter((j) => j.rarity === 'common')
  const rares = JOBS.filter((j) => j.rarity === 'rare')
  const isRare = Math.random() < 0.1
  const pool = isRare ? rares : commons
  return pool[Math.floor(Math.random() * pool.length)]
}

export const JOB_BONUS_MULTIPLIER = 1.2
