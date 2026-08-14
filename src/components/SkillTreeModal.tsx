import { useState } from 'react'
import { Modal } from './Modal'
import { CATEGORY_LIST } from '../data/categories'
import { nodesForCategory, spentSkillPoints, totalSkillPointsForLevel, canUnlockNode } from '../data/skillTree'
import { useStore } from '../state/store'
import { levelFromTotalXp } from '../utils/xp'
import type { Category } from '../types'

export function SkillTreeModal({ onClose }: { onClose: () => void }) {
  const skillNodes = useStore((s) => s.character.skillNodes)
  const totalXp = useStore((s) => s.character.totalXp)
  const unlockSkillNode = useStore((s) => s.unlockSkillNode)
  const [activeCategory, setActiveCategory] = useState<Category>('STR')

  const level = levelFromTotalXp(totalXp).level
  const totalPoints = totalSkillPointsForLevel(level)
  const spent = spentSkillPoints(skillNodes)
  const available = totalPoints - spent
  const nodes = nodesForCategory(activeCategory)

  return (
    <Modal title="スキルツリー" onClose={onClose}>
      <p className="mb-1 text-sm text-white/60">
        レベルアップごとにスキルポイントを1獲得します。分野ごとに下段から順に解放でき、ジョブボーナスとは別に獲得量が上乗せされます。
      </p>
      <p className="mb-3 text-xs text-white/45">
        使えるスキルポイント: <span className="font-num text-[var(--color-gold-400)]">{available}</span> / 累計{totalPoints}
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
      <div className="flex flex-col gap-2">
        {nodes.map((node) => {
          const unlocked = skillNodes.includes(node.id)
          const unlockable = !unlocked && canUnlockNode(node, skillNodes, available)
          return (
            <div
              key={node.id}
              className={`rpg-panel flex items-center gap-3 p-3 ${!unlocked && !unlockable ? 'opacity-50' : ''}`}
            >
              <span className="text-2xl">{unlocked ? '⭐' : '☆'}</span>
              <div className="min-w-0 flex-1">
                <p className="font-display text-sm font-semibold text-white/90">{node.name}</p>
                <p className="text-xs text-white/50">{node.description}</p>
                <p className="font-num mt-0.5 text-[11px] text-white/35">消費ポイント {node.cost}</p>
              </div>
              {!unlocked && (
                <button
                  type="button"
                  disabled={!unlockable}
                  onClick={() => unlockSkillNode(node.id)}
                  className="shrink-0 rounded-lg border border-[var(--color-gold-500)]/60 bg-[var(--color-gold-500)]/15 px-3 py-1.5 text-xs font-semibold text-[var(--color-gold-300)] transition hover:bg-[var(--color-gold-500)]/30 disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-[var(--color-gold-500)]/15"
                >
                  解放する
                </button>
              )}
              {unlocked && <span className="shrink-0 text-xs text-white/40">解放済み</span>}
            </div>
          )
        })}
      </div>
    </Modal>
  )
}
