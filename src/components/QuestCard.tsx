import type { JobInfo, QuestInstance } from '../types'
import { RankBadge } from './RankBadge'
import { CATEGORIES } from '../data/categories'
import { INTENSITY_LABEL } from '../utils/xp'
import { applyJobBonus } from '../utils/job'

export function QuestCard({
  quest,
  job,
  skillNodes = [],
  onComplete,
  onReroll,
  onRemove,
}: {
  quest: QuestInstance
  job?: JobInfo
  skillNodes?: string[]
  onComplete?: (id: string) => void
  onReroll?: (id: string) => void
  onRemove?: (id: string) => void
}) {
  const cat = CATEGORIES[quest.category]
  const isDone = quest.status === 'completed'
  const reward = job
    ? applyJobBonus({ xp: quest.xpReward, stat: quest.statReward }, quest.category, job, skillNodes)
    : { xp: quest.xpReward, stat: quest.statReward, bonusApplied: false, jobBonusPercent: 0, skillBonusPercent: 0 }

  return (
    <div
      className={`rpg-panel animate-rise relative flex gap-3 p-4 transition-opacity ${
        isDone ? 'opacity-55' : ''
      }`}
    >
      <RankBadge rank={quest.rank} size="sm" />
      <div className="min-w-0 flex-1">
        <div className="mb-1 flex flex-wrap items-center gap-1.5">
          <span
            className="rounded-full px-2 py-0.5 text-[10px] font-semibold"
            style={{ color: cat.color, backgroundColor: `${cat.color}22`, border: `1px solid ${cat.color}55` }}
          >
            {cat.label}
          </span>
          <span className="rounded-full border border-white/15 px-2 py-0.5 text-[10px] text-white/60">
            {INTENSITY_LABEL[quest.intensity]}
          </span>
          {quest.kind === 'special' && (
            <span className="rounded-full border border-[var(--color-gold-500)]/50 px-2 py-0.5 text-[10px] text-[var(--color-gold-400)]">
              受注クエスト
            </span>
          )}
          {quest.isCustom && (
            <span className="rounded-full border border-white/15 px-2 py-0.5 text-[10px] text-white/50">
              自作
            </span>
          )}
        </div>
        <h3
          className={`font-display text-base font-semibold text-white/90 ${isDone ? 'line-through decoration-white/40' : ''}`}
        >
          {quest.title}
        </h3>
        <p className="mt-0.5 text-sm text-white/55">{quest.description}</p>
        <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 font-num text-xs text-white/50">
          <span>目安 {quest.estMinutes > 0 ? `${quest.estMinutes}分` : '随時'}</span>
          <span className="text-[var(--color-mana-400)]">+{reward.xp} EXP</span>
          <span style={{ color: cat.color }}>
            +{reward.stat} {cat.short}
          </span>
          {reward.jobBonusPercent > 0 && (
            <span className="text-[var(--color-gold-400)]">{job?.emblem} ジョブボーナス</span>
          )}
          {reward.skillBonusPercent > 0 && (
            <span className="text-[var(--color-gold-400)]">⭐ スキルボーナス</span>
          )}
        </div>

        {!isDone && (onComplete || onReroll || onRemove) && (
          <div className="mt-3 flex flex-wrap items-center gap-2">
            {onComplete && (
              <button
                type="button"
                onClick={() => onComplete(quest.instanceId)}
                className="rounded-lg border border-[var(--color-gold-500)]/60 bg-[var(--color-gold-500)]/15 px-4 py-1.5 text-sm font-semibold whitespace-nowrap text-[var(--color-gold-300)] transition hover:bg-[var(--color-gold-500)]/30 active:scale-95"
              >
                達成する
              </button>
            )}
            {onReroll && (
              <button
                type="button"
                onClick={() => onReroll(quest.instanceId)}
                title="別のクエストに入れ替える"
                className="rounded-lg border border-white/15 px-3 py-1.5 text-sm whitespace-nowrap text-white/60 transition hover:border-white/30 hover:text-white/90"
              >
                入れ替え
              </button>
            )}
            {onRemove && (
              <button
                type="button"
                onClick={() => onRemove(quest.instanceId)}
                title="このクエストを取り下げる"
                className="ml-auto rounded-lg px-2 py-1.5 text-sm whitespace-nowrap text-white/35 transition hover:text-[var(--color-ember-500)]"
              >
                取り下げる
              </button>
            )}
          </div>
        )}
        {isDone && <p className="mt-2 text-xs text-[var(--color-rankE)]">✓ 達成済み</p>}
      </div>
    </div>
  )
}
