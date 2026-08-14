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
}

export type JobRarity = 'common' | 'rare'

export interface JobInfo {
  id: string
  name: string
  emblem: string
  rarity: JobRarity
  /** Categories this job is good at; quests in these categories earn a reward bonus. */
  affinities: Category[]
  description: string
}

export interface ItemInfo {
  id: string
  label: string
  icon: string
  category: Category
}
