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
}
