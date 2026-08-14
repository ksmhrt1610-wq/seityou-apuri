import type { Category, JobInfo } from '../types'
import { JOB_BONUS_MULTIPLIER } from '../data/jobs'

/**
 * Applies the job-affinity bonus to a base reward when the quest's category
 * matches one of the job's affinities. Kept as a pure function (rather than
 * baked into the quest instance at generation time) so it always reflects
 * the player's *current* job, including right after a job change.
 */
export function applyJobBonus(
  base: { xp: number; stat: number },
  category: Category,
  job: JobInfo,
): { xp: number; stat: number; bonusApplied: boolean } {
  const bonusApplied = job.affinities.includes(category)
  if (!bonusApplied) return { ...base, bonusApplied: false }
  return {
    xp: Math.round(base.xp * JOB_BONUS_MULTIPLIER),
    stat: Math.max(base.stat, Math.round(base.stat * JOB_BONUS_MULTIPLIER)),
    bonusApplied: true,
  }
}
