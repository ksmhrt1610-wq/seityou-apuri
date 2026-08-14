import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { QUEST_TEMPLATES } from '../data/questTemplates'
import { pickRandomJob, getJob, evolveJob } from '../data/jobs'
import type {
  Category,
  CharacterState,
  HistoryEntry,
  Intensity,
  JobInfo,
  PersonalizeSettings,
  QuestInstance,
} from '../types'
import { generateDailyQuests, instantiateTemplate } from '../utils/questGenerator'
import { computeReward, daysBetween, todayKey } from '../utils/xp'
import { applyJobBonus } from '../utils/job'
import { newId } from '../utils/id'

const emptyStats: Record<Category, number> = { STR: 0, VIT: 0, INT: 0, WIL: 0, CHA: 0, DEX: 0 }

interface BoardState {
  date: string
  dailyQuestIds: string[]
  residentQuestIds: string[]
}

const emptyBoard: BoardState = { date: '', dailyQuestIds: [], residentQuestIds: [] }

interface StoreState {
  character: CharacterState
  settings: PersonalizeSettings
  board: BoardState
  specialActiveIds: string[]
  quests: Record<string, QuestInstance>
  history: HistoryEntry[]
  inventory: string[]
  /** Template ids pinned as "resident" quests — re-instantiated fresh every day. */
  residentTemplateIds: string[]

  ensureTodayBoard: () => void
  completeQuest: (instanceId: string) => void
  rerollDailyQuest: (instanceId: string) => void
  addCustomQuest: (input: {
    title: string
    description: string
    category: Category
    rank: QuestInstance['rank']
    intensity: Intensity
    estMinutes: number
  }) => void
  removeActiveQuest: (instanceId: string) => void
  acceptSpecialQuest: (templateId: string) => void
  abandonSpecialQuest: (instanceId: string) => void
  pinResidentQuest: (templateId: string) => void
  unpinResidentQuest: (templateId: string) => void
  updateSettings: (partial: Partial<PersonalizeSettings>) => void
  setJob: (jobId: string) => void
  evolveCurrentJob: () => JobInfo
  addItem: (itemId: string) => void
  removeItem: (itemId: string) => void
  resetAll: () => void
  exportData: () => string
  importData: (json: string) => boolean
}

function recentTemplateIds(history: HistoryEntry[], days: number): Set<string> {
  const today = new Date()
  const cutoff = new Date(today)
  cutoff.setDate(cutoff.getDate() - days)
  const ids = new Set<string>()
  for (const h of history) {
    if (!h.templateId) continue
    const completed = new Date(h.completedAt)
    if (completed >= cutoff) ids.add(h.templateId)
  }
  return ids
}

const initialSettings: PersonalizeSettings = {
  adventurerName: '名もなき冒険者',
  interests: [],
  intensity: 'mid',
  dailyQuestCount: 3,
  onboarded: false,
}

const initialCharacter: CharacterState = {
  totalXp: 0,
  stats: { ...emptyStats },
  streakDays: 0,
  longestStreak: 0,
  lastCompletionDate: null,
  jobId: '',
}

export const useStore = create<StoreState>()(
  persist(
    (set, get) => ({
      character: { ...initialCharacter },
      settings: { ...initialSettings },
      board: { ...emptyBoard },
      specialActiveIds: [],
      quests: {},
      history: [],
      inventory: [],
      residentTemplateIds: [],

      ensureTodayBoard: () => {
        const state = get()
        const today = todayKey()
        if (state.board.date === today) return

        // Detect a fully-skipped day (no completion at all yesterday) and
        // reset the streak; a single missed day already breaks a streak.
        let { streakDays } = state.character
        if (state.character.lastCompletionDate) {
          const gap = daysBetween(state.character.lastCompletionDate, today)
          if (gap > 1) streakDays = 0
        }

        const recent = recentTemplateIds(state.history, 2)
        const owned = new Set(state.inventory)

        // Resident quests get a fresh instance every day, for every pinned template.
        const residentInstances: QuestInstance[] = []
        const residentTemplateIdSet = new Set<string>()
        for (const templateId of state.residentTemplateIds) {
          const template = QUEST_TEMPLATES.find((t) => t.id === templateId)
          if (!template) continue
          residentInstances.push(instantiateTemplate(template))
          residentTemplateIdSet.add(templateId)
        }

        const newQuests = generateDailyQuests(state.settings, state.settings.dailyQuestCount, {
          recentTemplateIds: recent,
          ownedItems: owned,
          jobId: state.character.jobId,
          excludeTemplateIds: residentTemplateIdSet,
        })

        const questsDict = { ...state.quests }
        for (const q of [...residentInstances, ...newQuests]) questsDict[q.instanceId] = q

        set({
          board: {
            date: today,
            dailyQuestIds: newQuests.map((q) => q.instanceId),
            residentQuestIds: residentInstances.map((q) => q.instanceId),
          },
          quests: questsDict,
          character: { ...state.character, streakDays },
        })
      },

      completeQuest: (instanceId) => {
        const state = get()
        const quest = state.quests[instanceId]
        if (!quest || quest.status !== 'active') return

        const job = getJob(state.character.jobId)
        const reward = applyJobBonus({ xp: quest.xpReward, stat: quest.statReward }, quest.category, job)

        const today = todayKey()
        const { character } = state
        let { streakDays, longestStreak } = character
        if (character.lastCompletionDate !== today) {
          if (character.lastCompletionDate) {
            const gap = daysBetween(character.lastCompletionDate, today)
            streakDays = gap === 1 ? streakDays + 1 : 1
          } else {
            streakDays = 1
          }
          longestStreak = Math.max(longestStreak, streakDays)
        }

        const newCharacter: CharacterState = {
          ...character,
          totalXp: character.totalXp + reward.xp,
          stats: {
            ...character.stats,
            [quest.category]: character.stats[quest.category] + reward.stat,
          },
          streakDays,
          longestStreak,
          lastCompletionDate: today,
        }

        const completedAt = new Date().toISOString()
        const entry: HistoryEntry = {
          id: newId('hist'),
          instanceId: quest.instanceId,
          templateId: quest.templateId,
          title: quest.title,
          description: quest.description,
          category: quest.category,
          rank: quest.rank,
          kind: quest.kind,
          intensity: quest.intensity,
          xpGained: reward.xp,
          statGained: reward.stat,
          completedAt,
          isCustom: quest.isCustom,
        }

        set({
          character: newCharacter,
          quests: {
            ...state.quests,
            [instanceId]: { ...quest, status: 'completed', completedAt },
          },
          specialActiveIds:
            quest.kind === 'special'
              ? state.specialActiveIds.filter((id) => id !== instanceId)
              : state.specialActiveIds,
          history: [entry, ...state.history],
        })
      },

      rerollDailyQuest: (instanceId) => {
        const state = get()
        const quest = state.quests[instanceId]
        if (!quest || quest.status !== 'active' || quest.kind !== 'daily') return
        // Resident quests are a fixed daily commitment and are never rerolled.
        if (!state.board.dailyQuestIds.includes(instanceId)) return

        const recent = recentTemplateIds(state.history, 2)
        for (const id of [...state.board.dailyQuestIds, ...state.board.residentQuestIds]) {
          const t = state.quests[id]?.templateId
          if (t) recent.add(t)
        }
        const owned = new Set(state.inventory)
        const [replacement] = generateDailyQuests(state.settings, 1, {
          recentTemplateIds: recent,
          ownedItems: owned,
          jobId: state.character.jobId,
        })
        if (!replacement) return

        const quests = { ...state.quests }
        delete quests[instanceId]
        quests[replacement.instanceId] = replacement

        set({
          quests,
          board: {
            ...state.board,
            dailyQuestIds: state.board.dailyQuestIds.map((id) =>
              id === instanceId ? replacement.instanceId : id,
            ),
          },
        })
      },

      addCustomQuest: (input) => {
        const reward = computeReward(input.rank, input.intensity)
        const quest: QuestInstance = {
          instanceId: newId('quest'),
          templateId: null,
          kind: 'daily',
          category: input.category,
          rank: input.rank,
          intensity: input.intensity,
          title: input.title,
          description: input.description,
          estMinutes: input.estMinutes,
          xpReward: reward.xp,
          statReward: reward.stat,
          isCustom: true,
          status: 'active',
          addedAt: new Date().toISOString(),
        }
        const state = get()
        set({
          quests: { ...state.quests, [quest.instanceId]: quest },
          board: { ...state.board, dailyQuestIds: [...state.board.dailyQuestIds, quest.instanceId] },
        })
      },

      removeActiveQuest: (instanceId) => {
        const state = get()
        const quest = state.quests[instanceId]
        if (!quest || quest.status !== 'active') return
        const quests = { ...state.quests }
        delete quests[instanceId]
        set({
          quests,
          board: {
            ...state.board,
            dailyQuestIds: state.board.dailyQuestIds.filter((id) => id !== instanceId),
            residentQuestIds: state.board.residentQuestIds.filter((id) => id !== instanceId),
          },
          specialActiveIds: state.specialActiveIds.filter((id) => id !== instanceId),
        })
      },

      acceptSpecialQuest: (templateId) => {
        const state = get()
        const alreadyActive = state.specialActiveIds.some(
          (id) => state.quests[id]?.templateId === templateId,
        )
        if (alreadyActive) return
        const template = QUEST_TEMPLATES.find((t) => t.id === templateId)
        if (!template) return
        const quest = instantiateTemplate(template)
        set({
          quests: { ...state.quests, [quest.instanceId]: quest },
          specialActiveIds: [...state.specialActiveIds, quest.instanceId],
        })
      },

      abandonSpecialQuest: (instanceId) => {
        const state = get()
        const quests = { ...state.quests }
        delete quests[instanceId]
        set({
          quests,
          specialActiveIds: state.specialActiveIds.filter((id) => id !== instanceId),
        })
      },

      pinResidentQuest: (templateId) => {
        const state = get()
        if (state.residentTemplateIds.includes(templateId)) return
        set({ residentTemplateIds: [...state.residentTemplateIds, templateId] })

        // Reflect the change in today's board immediately, if it's already generated.
        const today = todayKey()
        if (state.board.date === today) {
          const template = QUEST_TEMPLATES.find((t) => t.id === templateId)
          if (template) {
            const instance = instantiateTemplate(template)
            set({
              quests: { ...get().quests, [instance.instanceId]: instance },
              board: {
                ...get().board,
                residentQuestIds: [...get().board.residentQuestIds, instance.instanceId],
              },
            })
          }
        }
      },

      unpinResidentQuest: (templateId) => {
        const state = get()
        set({ residentTemplateIds: state.residentTemplateIds.filter((id) => id !== templateId) })

        const today = todayKey()
        if (state.board.date === today) {
          const instanceId = state.board.residentQuestIds.find(
            (id) => state.quests[id]?.templateId === templateId && state.quests[id]?.status === 'active',
          )
          if (instanceId) {
            const quests = { ...get().quests }
            delete quests[instanceId]
            set({
              quests,
              board: {
                ...get().board,
                residentQuestIds: get().board.residentQuestIds.filter((id) => id !== instanceId),
              },
            })
          }
        }
      },

      updateSettings: (partial) => {
        const state = get()
        const newSettings = { ...state.settings, ...partial }
        set({ settings: newSettings })

        // First time onboarding completes, hand out a random starting job.
        if (partial.onboarded === true && !state.character.jobId) {
          set({ character: { ...get().character, jobId: pickRandomJob().id } })
        }

        // If today's board is already generated and the player just raised
        // their daily quest count, top it up immediately instead of
        // silently deferring the change to tomorrow.
        const today = todayKey()
        if (
          partial.dailyQuestCount !== undefined &&
          state.board.date === today &&
          newSettings.dailyQuestCount > state.board.dailyQuestIds.length
        ) {
          const missing = newSettings.dailyQuestCount - state.board.dailyQuestIds.length
          const recent = recentTemplateIds(state.history, 2)
          for (const id of [...state.board.dailyQuestIds, ...state.board.residentQuestIds]) {
            const t = state.quests[id]?.templateId
            if (t) recent.add(t)
          }
          const owned = new Set(state.inventory)
          const extra = generateDailyQuests(newSettings, missing, {
            recentTemplateIds: recent,
            ownedItems: owned,
            jobId: state.character.jobId,
          })
          if (extra.length > 0) {
            const questsDict = { ...get().quests }
            for (const q of extra) questsDict[q.instanceId] = q
            set({
              quests: questsDict,
              board: {
                ...get().board,
                dailyQuestIds: [...get().board.dailyQuestIds, ...extra.map((q) => q.instanceId)],
              },
            })
          }
        }
      },

      setJob: (jobId) => {
        set({ character: { ...get().character, jobId } })
      },

      evolveCurrentJob: () => {
        const current = getJob(get().character.jobId)
        const evolved = evolveJob(current)
        set({ character: { ...get().character, jobId: evolved.id } })
        return evolved
      },

      addItem: (itemId) => {
        const state = get()
        if (state.inventory.includes(itemId)) return
        set({ inventory: [...state.inventory, itemId] })
      },

      removeItem: (itemId) => {
        set({ inventory: get().inventory.filter((id) => id !== itemId) })
      },

      resetAll: () => {
        set({
          character: { ...initialCharacter, stats: { ...emptyStats } },
          settings: { ...initialSettings },
          board: { ...emptyBoard },
          specialActiveIds: [],
          quests: {},
          history: [],
          inventory: [],
          residentTemplateIds: [],
        })
      },

      exportData: () => {
        const state = get()
        return JSON.stringify(
          {
            exportedAt: new Date().toISOString(),
            character: state.character,
            settings: state.settings,
            board: state.board,
            specialActiveIds: state.specialActiveIds,
            quests: state.quests,
            history: state.history,
            inventory: state.inventory,
            residentTemplateIds: state.residentTemplateIds,
          },
          null,
          2,
        )
      },

      importData: (json) => {
        try {
          const data = JSON.parse(json)
          if (
            typeof data !== 'object' ||
            data === null ||
            typeof data.character !== 'object' ||
            typeof data.settings !== 'object' ||
            typeof data.quests !== 'object' ||
            !Array.isArray(data.history)
          ) {
            return false
          }
          const importedCharacter: CharacterState = {
            ...initialCharacter,
            ...data.character,
            stats: { ...emptyStats, ...data.character.stats },
            jobId: data.character.jobId || pickRandomJob().id,
          }
          set({
            character: importedCharacter,
            settings: { ...initialSettings, ...data.settings },
            board: { ...emptyBoard, ...data.board },
            specialActiveIds: Array.isArray(data.specialActiveIds) ? data.specialActiveIds : [],
            quests: data.quests,
            history: data.history,
            inventory: Array.isArray(data.inventory) ? data.inventory : [],
            residentTemplateIds: Array.isArray(data.residentTemplateIds) ? data.residentTemplateIds : [],
          })
          return true
        } catch {
          return false
        }
      },
    }),
    { name: 'seityou-apuri-v1' },
  ),
)
