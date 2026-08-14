import { useMemo, useState } from 'react'
import { useStore } from '../state/store'
import { QuestCard } from '../components/QuestCard'
import { CustomQuestForm } from '../components/CustomQuestForm'
import { Modal } from '../components/Modal'
import { QUEST_TEMPLATES } from '../data/questTemplates'
import { CATEGORIES } from '../data/categories'
import { RankBadge } from '../components/RankBadge'
import { INTENSITY_LABEL, guildRankFromLevel, levelFromTotalXp } from '../utils/xp'
import { useToast } from '../components/Toast'

export function QuestPage() {
  const board = useStore((s) => s.board)
  const quests = useStore((s) => s.quests)
  const specialActiveIds = useStore((s) => s.specialActiveIds)
  const completeQuest = useStore((s) => s.completeQuest)
  const rerollDailyQuest = useStore((s) => s.rerollDailyQuest)
  const removeActiveQuest = useStore((s) => s.removeActiveQuest)
  const acceptSpecialQuest = useStore((s) => s.acceptSpecialQuest)
  const abandonSpecialQuest = useStore((s) => s.abandonSpecialQuest)

  const { pushToast } = useToast()
  const [showForm, setShowForm] = useState(false)
  const [showCatalog, setShowCatalog] = useState(false)
  const [abandonTarget, setAbandonTarget] = useState<string | null>(null)

  const dailyQuests = board.dailyQuestIds.map((id) => quests[id]).filter(Boolean)
  const activeSpecial = specialActiveIds.map((id) => quests[id]).filter(Boolean)

  const acceptedTemplateIds = useMemo(
    () => new Set(activeSpecial.map((q) => q.templateId).filter(Boolean)),
    [activeSpecial],
  )
  const specialCatalog = QUEST_TEMPLATES.filter(
    (t) => t.kind === 'special' && !acceptedTemplateIds.has(t.id),
  )

  function handleComplete(id: string) {
    const q = quests[id]
    const beforeXp = useStore.getState().character.totalXp
    const beforeLevel = levelFromTotalXp(beforeXp).level
    const beforeRank = guildRankFromLevel(beforeLevel)

    completeQuest(id)
    if (q) pushToast(`クエスト達成! ${q.title}`, `+${q.xpReward} EXP / +${q.statReward} ${q.category}`)

    const afterXp = useStore.getState().character.totalXp
    const afterLevel = levelFromTotalXp(afterXp).level
    const afterRank = guildRankFromLevel(afterLevel)
    if (afterLevel > beforeLevel) {
      pushToast(`レベルアップ! Lv.${beforeLevel} → Lv.${afterLevel}`, undefined, 'levelup')
    }
    if (afterRank !== beforeRank) {
      pushToast(`ギルドランクが ${afterRank} に上がった!`, undefined, 'rankup')
    }
  }

  return (
    <div className="mx-auto flex max-w-2xl flex-col gap-6 pb-8">
      <section>
        <div className="mb-3 flex items-center justify-between">
          <h2 className="font-display text-base font-bold text-white/85">今日のクエスト</h2>
          <button
            type="button"
            onClick={() => setShowForm(true)}
            className="rounded-lg border border-white/15 px-3 py-1.5 text-xs text-white/60 transition hover:border-white/30 hover:text-white/90"
          >
            + クエストを自作する
          </button>
        </div>
        {dailyQuests.length === 0 ? (
          <p className="rpg-panel p-5 text-sm text-white/50">
            本日のクエストがありません。設定でカテゴリを見直すか、しばらくお待ちください。
          </p>
        ) : (
          <div className="flex flex-col gap-3">
            {dailyQuests.map((q) => (
              <QuestCard
                key={q.instanceId}
                quest={q}
                onComplete={q.status === 'active' ? handleComplete : undefined}
                onReroll={q.status === 'active' && !q.isCustom ? rerollDailyQuest : undefined}
                onRemove={q.status === 'active' ? removeActiveQuest : undefined}
              />
            ))}
          </div>
        )}
      </section>

      <section>
        <div className="mb-3 flex items-center justify-between">
          <h2 className="font-display text-base font-bold text-white/85">
            特別クエスト
            <span className="ml-2 text-xs font-normal text-white/40">腰を据えて取り組む大きな目標</span>
          </h2>
          <button
            type="button"
            onClick={() => setShowCatalog((v) => !v)}
            className="rounded-lg border border-white/15 px-3 py-1.5 text-xs text-white/60 transition hover:border-white/30 hover:text-white/90"
          >
            {showCatalog ? '一覧を閉じる' : '受注できるクエストを見る'}
          </button>
        </div>

        {activeSpecial.length > 0 && (
          <div className="mb-3 flex flex-col gap-3">
            {activeSpecial.map((q) => (
              <QuestCard
                key={q.instanceId}
                quest={q}
                onComplete={handleComplete}
                onRemove={setAbandonTarget}
              />
            ))}
          </div>
        )}
        {activeSpecial.length === 0 && !showCatalog && (
          <p className="rpg-panel p-5 text-sm text-white/50">
            まだ受注中の特別クエストはありません。腰を据えた挑戦をしたくなったら受注してみましょう。
          </p>
        )}

        {showCatalog && (
          <div className="flex flex-col gap-2">
            {specialCatalog.map((t) => {
              const cat = CATEGORIES[t.category]
              return (
                <div key={t.id} className="rpg-panel flex items-center gap-3 p-3">
                  <RankBadge rank={t.rank} size="sm" />
                  <div className="min-w-0 flex-1">
                    <div className="mb-0.5 flex items-center gap-1.5">
                      <span
                        className="rounded-full px-2 py-0.5 text-[10px] font-semibold"
                        style={{ color: cat.color, backgroundColor: `${cat.color}22` }}
                      >
                        {cat.label}
                      </span>
                      <span className="text-[10px] text-white/40">{INTENSITY_LABEL[t.intensity]}</span>
                    </div>
                    <p className="font-display text-sm font-semibold text-white/90">{t.title}</p>
                    <p className="text-xs text-white/50">{t.description}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => acceptSpecialQuest(t.id)}
                    className="shrink-0 rounded-lg border border-[var(--color-mana-500)]/50 bg-[var(--color-mana-500)]/10 px-3 py-1.5 text-xs font-semibold text-[var(--color-mana-400)] transition hover:bg-[var(--color-mana-500)]/25"
                  >
                    受注する
                  </button>
                </div>
              )
            })}
          </div>
        )}
      </section>

      {showForm && <CustomQuestForm onClose={() => setShowForm(false)} />}

      {abandonTarget && (
        <Modal title="特別クエストを取り下げますか?" onClose={() => setAbandonTarget(null)}>
          <p className="mb-4 text-sm text-white/60">
            「{quests[abandonTarget]?.title}」を取り下げます。ここまでの取り組みは記録に残らず、クエストは受注一覧に戻ります。
          </p>
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setAbandonTarget(null)}
              className="rounded-lg border border-white/15 px-4 py-2 text-sm text-white/60 hover:border-white/30"
            >
              続ける
            </button>
            <button
              type="button"
              onClick={() => {
                abandonSpecialQuest(abandonTarget)
                setAbandonTarget(null)
              }}
              className="rounded-lg border border-[var(--color-ember-600)]/60 bg-[var(--color-ember-600)]/20 px-4 py-2 text-sm font-semibold text-[var(--color-ember-400)] hover:bg-[var(--color-ember-600)]/35"
            >
              取り下げる
            </button>
          </div>
        </Modal>
      )}
    </div>
  )
}
