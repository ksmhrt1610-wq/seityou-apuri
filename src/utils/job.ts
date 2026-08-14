import type { Category, JobInfo } from '../types'
import { JOB_BONUS_PERCENT } from '../data/jobs'
import { getSkillTreeBonusPercent } from '../data/skillTree'

/**
 * Applies the job-affinity bonus and any unlocked skill-tree bonus to a
 * base reward. Kept as a pure function (rather than baked into the quest
 * instance at generation time) so it always reflects the player's
 * *current* job and skill tree, including right after a change.
 */
export function applyJobBonus(
  base: { xp: number; stat: number },
  category: Category,
  job: JobInfo,
  unlockedSkillNodes: string[] = [],
): {
  xp: number
  stat: number
  bonusApplied: boolean
  jobBonusPercent: number
  skillBonusPercent: number
} {
  const jobBonusPercent = job.affinities.includes(category) ? JOB_BONUS_PERCENT[job.tier] : 0
  const skillBonusPercent = getSkillTreeBonusPercent(category, unlockedSkillNodes)
  const totalPercent = jobBonusPercent + skillBonusPercent
  if (totalPercent === 0) {
    return { ...base, bonusApplied: false, jobBonusPercent: 0, skillBonusPercent: 0 }
  }
  const mult = 1 + totalPercent / 100
  return {
    xp: Math.round(base.xp * mult),
    stat: Math.max(base.stat, Math.round(base.stat * mult)),
    bonusApplied: true,
    jobBonusPercent,
    skillBonusPercent,
  }
}
