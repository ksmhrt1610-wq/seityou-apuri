import { useState } from 'react'
import { Modal } from './Modal'
import { QUEST_TEMPLATES } from '../data/questTemplates'
import { CATEGORY_LIST } from '../data/categories'
import { RankBadge } from './RankBadge'
import { useStore } from '../state/store'
import type { Category } from '../types'

export function ResidentQuestPickerModal({ onClose }: { onClose: () => void }) {
  const residentTemplateIds = useStore((s) => s.residentTemplateIds)
  const pinResidentQuest = useStore((s) => s.pinResidentQuest)
  const unpinResidentQuest = useStore((s) => s.unpinResidentQuest)
  const [activeCategory, setActiveCategory] = useState<Category>('STR')

  const templates = QUEST_TEMPLATES.filter(
    (t) => t.kind === 'daily' && !t.requiredJob && t.category === activeCategory,
  )

  return (
    <Modal title="常駐クエストを選ぶ" onClose={onClose}>
      <p className="mb-3 text-sm text-white/60">
        固定したいクエストを選んでください。常駐クエストは入れ替え抽選の対象にならず、毎日必ず出題されます。
      </p>
      <div className="mb-3 flex flex-wrap gap-1.5">
        {CATEGORY_LIST.map((c) => (
          <button
            key={c.key}
            type="button"
            onClick={() => setActiveCategory(c.key)}
            className="rounded-full border px-2.5 py-1 text-xs transition"
            style={
              activeCategory === c.key
                ? { color: c.color, borderColor: c.color, backgroundColor: `${c.color}22` }
                : { color: 'rgba(255,255,255,0.5)', borderColor: 'rgba(255,255,255,0.15)' }
            }
          >
            {c.label}
          </button>
        ))}
      </div>
      <div className="flex max-h-96 flex-col gap-2 overflow-y-auto pr-1">
        {templates.map((t) => {
          const pinned = residentTemplateIds.includes(t.id)
          return (
            <div key={t.id} className="rpg-panel flex items-center gap-3 p-3">
              <RankBadge rank={t.rank} size="sm" />
              <div className="min-w-0 flex-1">
                <p className="font-display text-sm font-semibold text-white/90">{t.title}</p>
                <p className="text-xs text-white/50">{t.description}</p>
              </div>
              <button
                type="button"
                onClick={() => (pinned ? unpinResidentQuest(t.id) : pinResidentQuest(t.id))}
                className={`shrink-0 rounded-lg border px-3 py-1.5 text-xs font-semibold transition ${
                  pinned
                    ? 'border-[var(--color-gold-500)]/60 bg-[var(--color-gold-500)]/20 text-[var(--color-gold-300)]'
                    : 'border-white/15 text-white/60 hover:border-white/30'
                }`}
              >
                {pinned ? '固定中' : '固定する'}
              </button>
            </div>
          )
        })}
      </div>
    </Modal>
  )
}
