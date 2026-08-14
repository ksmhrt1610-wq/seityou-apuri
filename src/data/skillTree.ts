import type { Category } from '../types'
import { CATEGORIES } from './categories'

export interface SkillNode {
  id: string
  category: Category
  tier: 1 | 2 | 3
  cost: number
  name: string
  description: string
  bonusPercent: number
}

const TIER_META: { tier: 1 | 2 | 3; cost: number; name: string; bonusPercent: number }[] = [
  { tier: 1, cost: 1, name: '基礎鍛錬', bonusPercent: 5 },
  { tier: 2, cost: 2, name: '熟練の型', bonusPercent: 10 },
  { tier: 3, cost: 3, name: '極意', bonusPercent: 18 },
]

export const SKILL_TREE_NODES: SkillNode[] = Object.values(CATEGORIES).flatMap((cat) =>
  TIER_META.map((t) => ({
    id: `${cat.key}-${t.tier}`,
    category: cat.key,
    tier: t.tier,
    cost: t.cost,
    name: `${cat.label}の${t.name}`,
    description: `${cat.label}系クエストの獲得量+${t.bonusPercent}%(ジョブボーナスとは別に加算)`,
    bonusPercent: t.bonusPercent,
  })),
)

export function nodesForCategory(category: Category): SkillNode[] {
  return SKILL_TREE_NODES.filter((n) => n.category === category).sort((a, b) => a.tier - b.tier)
}

/** Total skill points earned by the time the character reaches this level. 1 point per level-up. */
export function totalSkillPointsForLevel(level: number): number {
  return Math.max(0, level - 1)
}

export function spentSkillPoints(unlockedNodes: string[]): number {
  return SKILL_TREE_NODES.filter((n) => unlockedNodes.includes(n.id)).reduce((sum, n) => sum + n.cost, 0)
}

/** Highest-tier unlocked bonus for a category (tiers don't stack; only the best applies). */
export function getSkillTreeBonusPercent(category: Category, unlockedNodes: string[]): number {
  const unlocked = nodesForCategory(category).filter((n) => unlockedNodes.includes(n.id))
  if (unlocked.length === 0) return 0
  return Math.max(...unlocked.map((n) => n.bonusPercent))
}

export function canUnlockNode(node: SkillNode, unlockedNodes: string[], availablePoints: number): boolean {
  if (unlockedNodes.includes(node.id)) return false
  if (availablePoints < node.cost) return false
  if (node.tier === 1) return true
  const prevTier = nodesForCategory(node.category).find((n) => n.tier === node.tier - 1)
  return prevTier ? unlockedNodes.includes(prevTier.id) : true
}
