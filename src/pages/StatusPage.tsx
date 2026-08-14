import { useMemo } from 'react'
import { useStore } from '../state/store'
import { RankBadge } from '../components/RankBadge'
import { ExpBar } from '../components/ExpBar'
import { StatBarRow } from '../components/StatBarRow'
import { CATEGORY_LIST } from '../data/categories'
import { dominantCategory, guildRankFromLevel, levelFromTotalXp, titleFromLevel } from '../utils/xp'

export function StatusPage() {
  const character = useStore((s) => s.character)
  const settings = useStore((s) => s.settings)
  const quests = useStore((s) => s.quests)
  const board = useStore((s) => s.board)

  const levelInfo = useMemo(() => levelFromTotalXp(character.totalXp), [character.totalXp])
  const rank = guildRankFromLevel(levelInfo.level)
  const title = titleFromLevel(levelInfo.level)
  const dominant = dominantCategory(character.stats)
  const dominantInfo = dominant ? CATEGORY_LIST.find((c) => c.key === dominant) : null

  const todayQuests = board.dailyQuestIds.map((id) => quests[id]).filter(Boolean)
  const todayDone = todayQuests.filter((q) => q.status === 'completed').length

  return (
    <div className="mx-auto flex max-w-2xl flex-col gap-4 pb-8">
      <div className="rpg-panel animate-rise relative p-5 sm:p-6">
        <span className="rpg-corner tl" />
        <span className="rpg-corner tr" />
        <span className="rpg-corner bl" />
        <span className="rpg-corner br" />

        <div className="flex items-start gap-4">
          <RankBadge rank={rank} size="lg" />
          <div className="min-w-0 flex-1">
            <p className="text-xs tracking-wide text-white/50">称号・{title}</p>
            <h1 className="font-display glow-gold truncate text-2xl font-bold text-[var(--color-gold-300)] sm:text-3xl">
              {settings.adventurerName || '名もなき冒険者'}
            </h1>
            {dominantInfo && (
              <p className="mt-0.5 text-xs text-white/50">
                得意分野・
                <span style={{ color: dominantInfo.color }}>{dominantInfo.label}</span>
              </p>
            )}
          </div>
          <div className="text-right">
            <p className="text-xs text-white/50">LEVEL</p>
            <p className="font-num glow-mana text-3xl font-bold text-[var(--color-mana-400)] sm:text-4xl">
              {levelInfo.level}
            </p>
          </div>
        </div>

        <div className="mt-5">
          <ExpBar progress={levelInfo.progress} currentXp={levelInfo.currentXp} xpNeeded={levelInfo.xpNeeded} />
        </div>

        <div className="mt-4 grid grid-cols-2 gap-3">
          <div className="rounded-lg border border-white/10 bg-black/20 px-3 py-2">
            <p className="text-[11px] text-white/50">連続達成日数</p>
            <p className="font-num flex items-center gap-1 text-lg font-bold text-[var(--color-ember-400)]">
              🔥 {character.streakDays}
              <span className="text-xs font-normal text-white/40">日</span>
            </p>
          </div>
          <div className="rounded-lg border border-white/10 bg-black/20 px-3 py-2">
            <p className="text-[11px] text-white/50">今日の達成</p>
            <p className="font-num text-lg font-bold text-white/90">
              {todayDone}
              <span className="text-xs font-normal text-white/40"> / {todayQuests.length}</span>
            </p>
          </div>
        </div>
      </div>

      <div className="rpg-panel animate-rise p-5 sm:p-6">
        <h2 className="font-display mb-4 text-sm font-semibold tracking-wide text-white/70">ステータス</h2>
        <div className="flex flex-col gap-3">
          {CATEGORY_LIST.map((info) => (
            <StatBarRow key={info.key} info={info} value={character.stats[info.key]} />
          ))}
        </div>
      </div>

      <div className="rpg-panel animate-rise p-5 sm:p-6">
        <h2 className="font-display mb-2 text-sm font-semibold tracking-wide text-white/70">最長記録</h2>
        <p className="text-sm text-white/60">
          最長連続達成日数は
          <span className="font-num mx-1 text-[var(--color-gold-400)]">{character.longestStreak}</span>
          日です。積み重ねた記録は、どれだけ小さくても消えません。
        </p>
      </div>
    </div>
  )
}
