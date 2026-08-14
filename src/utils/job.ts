import type { Category, JobInfo } from '../types'
import { JOB_BONUS_MULTIPLIER, JOB_BONUS_MULTIPLIER_TIER2 } from '../data/jobs'

/**
 * Applies the job-affinity bonus to a base reward when the quest's category
 * matches one of the job's affinities. Kept as a pure function (rather than
 * baked into the quest instance at generation time) so it always reflects
 * the player's *current* job, including right after a job change or
 * evolution. Tier-2 (evolved/unique) jobs give a bigger bonus.
 */
export function applyJobBonus(
  base: { xp: number; stat: number },
  category: Category,
  job: JobInfo,
): { xp: number; stat: number; bonusApplied: boolean } {
  const bonusApplied = job.affinities.includes(category)
  if (!bonusApplied) return { ...base, bonusApplied: false }
  const mult = job.tier === 2 ? JOB_BONUS_MULTIPLIER_TIER2 : JOB_BONUS_MULTIPLIER
  return {
    xp: Math.round(base.xp * mult),
    stat: Math.max(base.stat, Math.round(base.stat * mult)),
    bonusApplied: true,
  }
}
