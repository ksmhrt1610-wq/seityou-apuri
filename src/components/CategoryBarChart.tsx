import { CATEGORY_LIST } from '../data/categories'
import type { HistoryEntry } from '../types'

export function CategoryBarChart({ history }: { history: HistoryEntry[] }) {
  const totals = CATEGORY_LIST.map((c) => ({
    info: c,
    count: history.filter((h) => h.category === c.key).length,
  }))
  const max = Math.max(1, ...totals.map((t) => t.count))

  return (
    <div className="flex flex-col gap-2.5">
      {totals.map(({ info, count }) => (
        <div key={info.key} className="flex items-center gap-3">
          <span className="w-14 shrink-0 text-xs text-white/60">{info.label}</span>
          <div className="stat-bar-track flex-1">
            <div
              className="stat-bar-fill"
              style={{ width: `${count > 0 ? Math.max(4, (count / max) * 100) : 0}%`, background: info.color }}
            />
          </div>
          <span className="font-num w-6 shrink-0 text-right text-xs text-white/70">{count}</span>
        </div>
      ))}
    </div>
  )
}
