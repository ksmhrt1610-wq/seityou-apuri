export function ExpBar({
  progress,
  currentXp,
  xpNeeded,
}: {
  progress: number
  currentXp: number
  xpNeeded: number
}) {
  return (
    <div>
      <div className="exp-bar-track">
        <div className="exp-bar-fill" style={{ width: `${Math.max(2, progress * 100)}%` }} />
      </div>
      <div className="mt-1 flex justify-between font-num text-xs text-[var(--color-mana-400)]">
        <span>EXP</span>
        <span>
          {currentXp} / {xpNeeded}
        </span>
      </div>
    </div>
  )
}
