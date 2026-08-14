import { Modal } from './Modal'
import { JOBS } from '../data/jobs'
import { CATEGORIES } from '../data/categories'
import { useStore } from '../state/store'

export function JobChangeModal({ onClose }: { onClose: () => void }) {
  const currentJobId = useStore((s) => s.character.jobId)
  const setJob = useStore((s) => s.setJob)

  return (
    <Modal title="ジョブチェンジ" onClose={onClose}>
      <p className="mb-4 text-sm text-white/60">
        就きたいジョブを選んでください。得意分野に合ったクエストを達成すると、報酬が20%増えます。
      </p>
      <div className="flex flex-col gap-2">
        {JOBS.map((job) => {
          const active = job.id === currentJobId
          return (
            <button
              key={job.id}
              type="button"
              onClick={() => {
                setJob(job.id)
                onClose()
              }}
              className={`flex items-center gap-3 rounded-lg border p-3 text-left transition ${
                active
                  ? 'border-[var(--color-gold-500)] bg-[var(--color-gold-500)]/15'
                  : 'border-white/15 hover:border-white/30'
              }`}
            >
              <span className="text-2xl">{job.emblem}</span>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-1.5">
                  <span className="font-display text-sm font-semibold text-white/90">{job.name}</span>
                  {job.rarity === 'rare' && (
                    <span className="rounded-full border border-[var(--color-gold-500)]/50 px-1.5 py-0.5 text-[9px] text-[var(--color-gold-400)]">
                      ユニーク
                    </span>
                  )}
                  {active && (
                    <span className="rounded-full border border-white/20 px-1.5 py-0.5 text-[9px] text-white/50">
                      現在のジョブ
                    </span>
                  )}
                </div>
                <p className="mt-0.5 text-xs text-white/50">{job.description}</p>
                <p className="mt-0.5 text-[11px] text-white/40">
                  得意: {job.affinities.map((c) => CATEGORIES[c].label).join('・')}
                </p>
              </div>
            </button>
          )
        })}
      </div>
    </Modal>
  )
}
