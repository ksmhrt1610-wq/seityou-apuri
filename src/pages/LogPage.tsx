import { useMemo } from 'react'
import { useStore } from '../state/store'
import { CategoryBarChart } from '../components/CategoryBarChart'
import { CATEGORIES } from '../data/categories'
import { RankBadge } from '../components/RankBadge'
import { formatDateKeyJp, formatTimeJp } from '../utils/format'
import { todayKey } from '../utils/xp'

export function LogPage() {
  const history = useStore((s) => s.history)
  const character = useStore((s) => s.character)

  const grouped = useMemo(() => {
    const map = new Map<string, typeof history>()
    for (const h of history) {
      const key = h.completedAt.slice(0, 10)
      const list = map.get(key) ?? []
      list.push(h)
      map.set(key, list)
    }
    return Array.from(map.entries()).sort((a, b) => (a[0] < b[0] ? 1 : -1))
  }, [history])

  const today = todayKey()

  return (
    <div className="mx-auto flex max-w-2xl flex-col gap-5 pb-8">
      <div className="rpg-panel p-5 sm:p-6">
        <h2 className="font-display section-title mb-3 text-sm font-semibold tracking-wide text-white/70">これまでの記録</h2>
        <div className="grid grid-cols-3 gap-3 text-center">
          <div>
            <p className="font-num text-2xl font-bold text-[var(--color-gold-300)]">{history.length}</p>
            <p className="text-[11px] text-white/50">総達成数</p>
          </div>
          <div>
            <p className="font-num text-2xl font-bold text-[var(--color-ember-400)]">{character.longestStreak}</p>
            <p className="text-[11px] text-white/50">最長連続日数</p>
          </div>
          <div>
            <p className="font-num text-2xl font-bold text-[var(--color-mana-400)]">{character.totalXp}</p>
            <p className="text-[11px] text-white/50">累計EXP</p>
          </div>
        </div>
      </div>

      <div className="rpg-panel p-5 sm:p-6">
        <h2 className="font-display section-title mb-3 text-sm font-semibold tracking-wide text-white/70">分野別の達成傾向</h2>
        <CategoryBarChart history={history} />
      </div>

      <div>
        <h2 className="font-display section-title mb-3 text-sm font-semibold tracking-wide text-white/70">冒険の書</h2>
        {grouped.length === 0 && (
          <p className="rpg-panel p-5 text-sm text-white/50">
            まだ記録はありません。クエストを達成すると、ここに刻まれていきます。
          </p>
        )}
        <div className="flex flex-col gap-4">
          {grouped.map(([dateKey, entries]) => (
            <div key={dateKey}>
              <p className="mb-2 flex items-center gap-2 text-xs text-white/50">
                <span className="h-px flex-1 bg-white/10" />
                {dateKey === today ? '今日' : formatDateKeyJp(dateKey)}
                <span className="h-px flex-1 bg-white/10" />
              </p>
              <div className="flex flex-col gap-2">
                {entries.map((h) => {
                  const cat = CATEGORIES[h.category]
                  return (
                    <div key={h.id} className="rpg-panel flex items-center gap-3 p-3">
                      <RankBadge rank={h.rank} size="sm" />
                      <div className="min-w-0 flex-1">
                        <p className="font-display flex items-center gap-1.5 truncate text-sm font-semibold text-white/90">
                          {h.title}
                          {h.kind === 'special' && (
                            <span className="shrink-0 rounded-full border border-[var(--color-gold-500)]/50 px-1.5 py-0.5 text-[9px] font-normal text-[var(--color-gold-400)]">
                              特別
                            </span>
                          )}
                        </p>
                        <p className="flex flex-wrap items-center gap-x-2 text-[11px] text-white/45">
                          <span style={{ color: cat.color }}>{cat.label}</span>
                          <span>{formatTimeJp(h.completedAt)}</span>
                          <span className="text-[var(--color-mana-400)]">+{h.xpGained} EXP</span>
                        </p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
