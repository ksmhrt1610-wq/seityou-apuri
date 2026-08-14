import type { Category, Intensity, Rank } from '../types'

export const RANK_ORDER: Rank[] = ['F', 'E', 'D', 'C', 'B', 'A', 'S']

export const RANK_BASE_XP: Record<Rank, number> = {
  F: 15,
  E: 25,
  D: 40,
  C: 65,
  B: 100,
  A: 150,
  S: 220,
}

export const RANK_BASE_STAT: Record<Rank, number> = {
  F: 1,
  E: 1,
  D: 2,
  C: 2,
  B: 3,
  A: 4,
  S: 5,
}

export const RANK_COLOR: Record<Rank, string> = {
  F: 'var(--color-rankF)',
  E: 'var(--color-rankE)',
  D: 'var(--color-rankD)',
  C: 'var(--color-rankC)',
  B: 'var(--color-rankB)',
  A: 'var(--color-rankA)',
  S: 'var(--color-rankS)',
}

export const INTENSITY_MULTIPLIER: Record<Intensity, number> = {
  low: 0.8,
  mid: 1,
  high: 1.3,
}

export const INTENSITY_LABEL: Record<Intensity, string> = {
  low: '控えめ',
  mid: '標準',
  high: '本気',
}

export function computeReward(rank: Rank, intensity: Intensity) {
  const mult = INTENSITY_MULTIPLIER[intensity]
  return {
    xp: Math.round(RANK_BASE_XP[rank] * mult),
    stat: Math.max(1, Math.round(RANK_BASE_STAT[rank] * mult)),
  }
}

/** XP required to advance FROM this level to the next. */
export function xpToNextLevel(level: number): number {
  return 60 + (level - 1) * 30
}

export interface LevelInfo {
  level: number
  currentXp: number
  xpNeeded: number
  progress: number
}

export function levelFromTotalXp(totalXp: number): LevelInfo {
  let level = 1
  let remaining = totalXp
  // Safety cap avoids runaway loops on corrupted/huge data.
  while (remaining >= xpToNextLevel(level) && level < 9999) {
    remaining -= xpToNextLevel(level)
    level += 1
  }
  const xpNeeded = xpToNextLevel(level)
  return {
    level,
    currentXp: remaining,
    xpNeeded,
    progress: Math.min(1, remaining / xpNeeded),
  }
}

const GUILD_RANK_THRESHOLDS: { level: number; rank: Rank }[] = [
  { level: 40, rank: 'S' },
  { level: 30, rank: 'A' },
  { level: 20, rank: 'B' },
  { level: 15, rank: 'C' },
  { level: 10, rank: 'D' },
  { level: 5, rank: 'E' },
  { level: 1, rank: 'F' },
]

export function guildRankFromLevel(level: number): Rank {
  for (const t of GUILD_RANK_THRESHOLDS) {
    if (level >= t.level) return t.rank
  }
  return 'F'
}

const TITLE_THRESHOLDS: { level: number; title: string }[] = [
  { level: 50, title: '神話級の存在' },
  { level: 40, title: '伝説の冒険者' },
  { level: 30, title: '大英雄' },
  { level: 25, title: '英雄' },
  { level: 20, title: '英雄候補' },
  { level: 15, title: '精鋭冒険者' },
  { level: 11, title: '熟練の冒険者' },
  { level: 8, title: '一人前の冒険者' },
  { level: 5, title: '見習い冒険者' },
  { level: 3, title: '駆け出しの冒険者' },
  { level: 1, title: '迷い込んだ者' },
]

export function titleFromLevel(level: number): string {
  for (const t of TITLE_THRESHOLDS) {
    if (level >= t.level) return t.title
  }
  return TITLE_THRESHOLDS[TITLE_THRESHOLDS.length - 1].title
}

export function dominantCategory(stats: Record<Category, number>): Category | null {
  const entries = Object.entries(stats) as [Category, number][]
  if (entries.every(([, v]) => v === 0)) return null
  return entries.reduce((a, b) => (b[1] > a[1] ? b : a))[0]
}

export function todayKey(d: Date = new Date()): string {
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${y}-${m}-${day}`
}

export function daysBetween(a: string, b: string): number {
  const da = new Date(`${a}T00:00:00`)
  const db = new Date(`${b}T00:00:00`)
  return Math.round((db.getTime() - da.getTime()) / 86400000)
}
