import type { CategoryInfo } from '../types'

// Soft visual cap so the bar reads meaningfully even as raw stat values grow unbounded.
const VISUAL_CAP = 60

export function StatBarRow({ info, value }: { info: CategoryInfo; value: number }) {
  const pct = Math.min(100, (value / VISUAL_CAP) * 100)
  return (
    <div className="flex items-center gap-3">
      <div className="w-16 shrink-0">
        <p className="font-num text-xs font-semibold" style={{ color: info.color }}>
          {info.short}
        </p>
        <p className="text-[11px] text-white/50">{info.label}</p>
      </div>
      <div className="stat-bar-track flex-1">
        <div
          className="stat-bar-fill"
          style={{ width: `${Math.max(value > 0 ? 3 : 0, pct)}%`, background: info.color }}
        />
      </div>
      <span className="font-num w-8 shrink-0 text-right text-sm text-white/80">{value}</span>
    </div>
  )
}
