import { Modal } from './Modal'
import { CATEGORIES } from '../data/categories'
import type { JobInfo } from '../types'

/**
 * Purely presentational reveal for an evolution result. The random roll
 * itself happens once in the caller (via store.evolveCurrentJob()) so this
 * component never re-triggers the mutation on re-render/remount.
 */
export function JobEvolutionModal({
  job,
  grand,
  onClose,
}: {
  job: JobInfo
  grand?: boolean
  onClose: () => void
}) {
  return (
    <Modal title={grand ? '大いなる進化' : 'ジョブ進化'} onClose={onClose}>
      <div className="flex flex-col items-center gap-2 py-2 text-center">
        <p className="mb-1 text-xs tracking-widest text-[var(--color-mana-400)]">
          {grand ? 'GRAND EVOLUTION' : 'EVOLUTION'}
        </p>
        <span className="animate-pulse-glow flex h-20 w-20 items-center justify-center rounded-full border-2 border-[var(--color-gold-500)] text-4xl">
          {job.emblem}
        </span>
        {job.rarity === 'rare' && (
          <span className="rounded-full border border-[var(--color-gold-500)]/60 px-2 py-0.5 text-[10px] text-[var(--color-gold-400)]">
            ユニークジョブ出現!
          </span>
        )}
        {job.rarity === 'legendary' && (
          <span className="rounded-full border border-[var(--color-gold-500)]/60 px-2 py-0.5 text-[10px] text-[var(--color-gold-400)]">
            最終形態に到達!
          </span>
        )}
        <h2 className="font-display glow-gold text-xl font-bold text-[var(--color-gold-300)]">{job.name}</h2>
        <p className="text-sm text-white/60">{job.description}</p>
        <p className="text-xs text-white/40">
          得意分野: {job.affinities.map((c) => CATEGORIES[c].label).join('・')}
        </p>
        <button
          type="button"
          onClick={onClose}
          className="mt-4 w-full rounded-lg border border-[var(--color-gold-500)]/60 bg-[var(--color-gold-500)]/20 px-4 py-2.5 text-sm font-semibold text-[var(--color-gold-300)] transition hover:bg-[var(--color-gold-500)]/35"
        >
          この姿を受け入れる
        </button>
      </div>
    </Modal>
  )
}
