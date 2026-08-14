import type { JobInfo } from '../types'
import type { TrialInfo } from '../data/trials'
import { RankBadge } from './RankBadge'
import { CATEGORIES } from '../data/categories'
import { computeReward } from '../utils/xp'
import { applyJobBonus } from '../utils/job'

export function TrialQuestCard({
  trial,
  job,
  skillNodes,
  onComplete,
}: {
  trial: TrialInfo
  job: JobInfo
  skillNodes: string[]
  onComplete: () => void
}) {
  const category = job.affinities[0]
  const cat = CATEGORIES[category]
  const base = computeReward(trial.rank, 'high')
  const reward = applyJobBonus(base, category, job, skillNodes)

  return (
    <div className="rpg-panel relative flex gap-3 p-4">
      <RankBadge rank={trial.rank} size="sm" />
      <div className="min-w-0 flex-1">
        <div className="mb-1 flex flex-wrap items-center gap-1.5">
          <span
            className="rounded-full px-2 py-0.5 text-[10px] font-semibold"
            style={{ color: cat.color, backgroundColor: `${cat.color}22`, border: `1px solid ${cat.color}55` }}
          >
            {cat.label}
          </span>
          <span className="rounded-full border border-[var(--color-gold-500)]/50 px-2 py-0.5 text-[10px] text-[var(--color-gold-400)]">
            昇級試練
          </span>
        </div>
        <h3 className="font-display text-base font-semibold text-white/90">{trial.title}</h3>
        <p className="mt-0.5 text-sm text-white/55">{trial.description}</p>
        <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 font-num text-xs text-white/50">
          <span>目安 {trial.estMinutes > 0 ? `${trial.estMinutes}分` : '随時'}</span>
          <span className="text-[var(--color-mana-400)]">+{reward.xp} EXP</span>
          <span style={{ color: cat.color }}>
            +{reward.stat} {cat.short}
          </span>
        </div>
        <button
          type="button"
          onClick={onComplete}
          className="mt-3 rounded-lg border border-[var(--color-gold-500)]/60 bg-[var(--color-gold-500)]/15 px-4 py-1.5 text-sm font-semibold text-[var(--color-gold-300)] transition hover:bg-[var(--color-gold-500)]/30 active:scale-95"
        >
          試練に挑む
        </button>
      </div>
    </div>
  )
}
