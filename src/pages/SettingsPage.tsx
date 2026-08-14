import { useRef, useState } from 'react'
import { useStore } from '../state/store'
import { CATEGORY_LIST, CATEGORIES } from '../data/categories'
import { ITEMS } from '../data/items'
import { getJob, EVOLUTION_LEVEL } from '../data/jobs'
import type { Category, Intensity, JobInfo } from '../types'
import { INTENSITY_LABEL, levelFromTotalXp } from '../utils/xp'
import { Modal } from '../components/Modal'
import { JobChangeModal } from '../components/JobChangeModal'
import { JobEvolutionModal } from '../components/JobEvolutionModal'
import { ResidentQuestPickerModal } from '../components/ResidentQuestPickerModal'
import { QUEST_TEMPLATES } from '../data/questTemplates'
import { useToast } from '../components/Toast'

const INTENSITIES: Intensity[] = ['low', 'mid', 'high']

export function SettingsPage() {
  const settings = useStore((s) => s.settings)
  const updateSettings = useStore((s) => s.updateSettings)
  const resetAll = useStore((s) => s.resetAll)
  const exportData = useStore((s) => s.exportData)
  const importData = useStore((s) => s.importData)
  const jobId = useStore((s) => s.character.jobId)
  const totalXp = useStore((s) => s.character.totalXp)
  const evolveCurrentJob = useStore((s) => s.evolveCurrentJob)
  const inventory = useStore((s) => s.inventory)
  const addItem = useStore((s) => s.addItem)
  const removeItem = useStore((s) => s.removeItem)
  const residentTemplateIds = useStore((s) => s.residentTemplateIds)
  const unpinResidentQuest = useStore((s) => s.unpinResidentQuest)
  const [confirmReset, setConfirmReset] = useState(false)
  const [nameDraft, setNameDraft] = useState(settings.adventurerName)
  const [showJobModal, setShowJobModal] = useState(false)
  const [evolutionResult, setEvolutionResult] = useState<JobInfo | null>(null)
  const [showResidentPicker, setShowResidentPicker] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const { pushToast } = useToast()
  const job = getJob(jobId)
  const level = levelFromTotalXp(totalXp).level
  const canChangeJob = level >= EVOLUTION_LEVEL

  function toggleItem(itemId: string) {
    if (inventory.includes(itemId)) removeItem(itemId)
    else addItem(itemId)
  }

  function handleExport() {
    const json = exportData()
    const blob = new Blob([json], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    const today = new Date().toISOString().slice(0, 10)
    a.href = url
    a.download = `seityou-apuri-backup-${today}.json`
    document.body.appendChild(a)
    a.click()
    a.remove()
    URL.revokeObjectURL(url)
    pushToast('冒険の記録をバックアップしました')
  }

  function handleImportFile(file: File) {
    const reader = new FileReader()
    reader.onload = () => {
      const ok = importData(String(reader.result))
      if (ok) {
        useStore.getState().ensureTodayBoard()
        pushToast('バックアップから記録を復元しました')
      } else {
        window.alert('読み込みに失敗しました。ファイルが壊れているか、対応していない形式です。')
      }
    }
    reader.readAsText(file)
  }

  function toggleInterest(cat: Category) {
    const has = settings.interests.includes(cat)
    const next = has ? settings.interests.filter((c) => c !== cat) : [...settings.interests, cat]
    updateSettings({ interests: next })
  }

  return (
    <div className="mx-auto flex max-w-2xl flex-col gap-5 pb-8">
      <div className="rpg-panel p-5 sm:p-6">
        <h2 className="font-display section-title mb-3 text-sm font-semibold tracking-wide text-white/70">冒険者名</h2>
        <div className="flex gap-2">
          <input
            value={nameDraft}
            onChange={(e) => setNameDraft(e.target.value)}
            onBlur={() => updateSettings({ adventurerName: nameDraft.trim() || '名もなき冒険者' })}
            maxLength={20}
            className="w-full rounded-lg border border-white/15 bg-black/30 px-3 py-2 text-sm text-white/90 outline-none focus:border-[var(--color-mana-500)]"
          />
        </div>
      </div>

      <div className="rpg-panel p-5 sm:p-6">
        <h2 className="font-display section-title mb-3 text-sm font-semibold tracking-wide text-white/70">ジョブ</h2>
        <div className="flex items-center gap-3">
          <span className="text-3xl">{job.emblem}</span>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-1.5">
              <span className="font-display text-base font-semibold text-white/90">{job.name}</span>
              {job.rarity === 'rare' && (
                <span className="rounded-full border border-[var(--color-gold-500)]/50 px-1.5 py-0.5 text-[9px] text-[var(--color-gold-400)]">
                  ユニーク
                </span>
              )}
            </div>
            <p className="text-xs text-white/50">{job.description}</p>
            <p className="mt-0.5 text-[11px] text-white/40">
              得意: {job.affinities.map((c) => CATEGORIES[c].label).join('・')}
              (報酬+{job.tier === 2 ? 35 : 20}%)
            </p>
          </div>
        </div>

        {canChangeJob ? (
          <div className="mt-4 flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setShowJobModal(true)}
              className="rounded-lg border border-white/15 px-3 py-1.5 text-xs text-white/60 transition hover:border-white/30 hover:text-white/90"
            >
              ジョブチェンジ
            </button>
            {job.tier === 1 && (
              <button
                type="button"
                onClick={() => setEvolutionResult(evolveCurrentJob())}
                className="rounded-lg border border-[var(--color-gold-500)]/60 bg-[var(--color-gold-500)]/15 px-3 py-1.5 text-xs font-semibold text-[var(--color-gold-300)] transition hover:bg-[var(--color-gold-500)]/30"
              >
                進化する
              </button>
            )}
          </div>
        ) : (
          <p className="mt-4 text-[11px] text-white/40">
            Lv.{EVOLUTION_LEVEL}になるとジョブチェンジ・進化が可能になります(現在 Lv.{level})
          </p>
        )}
      </div>

      <div className="rpg-panel p-5 sm:p-6">
        <h2 className="font-display section-title mb-1 text-sm font-semibold tracking-wide text-white/70">得意にしたい分野</h2>
        <p className="mb-3 text-xs text-white/45">
          選んだ分野を中心にクエストが出題されます。何も選ばなければ全分野からバランスよく出題します。
        </p>
        <div className="flex flex-wrap gap-2">
          {CATEGORY_LIST.map((c) => {
            const active = settings.interests.includes(c.key)
            return (
              <button
                key={c.key}
                type="button"
                onClick={() => toggleInterest(c.key)}
                className="rounded-full border px-3 py-1.5 text-sm transition"
                style={
                  active
                    ? { color: c.color, borderColor: c.color, backgroundColor: `${c.color}22` }
                    : { color: 'rgba(255,255,255,0.5)', borderColor: 'rgba(255,255,255,0.15)' }
                }
              >
                {c.label}
              </button>
            )
          })}
        </div>
      </div>

      <div className="rpg-panel p-5 sm:p-6">
        <h2 className="font-display section-title mb-1 text-sm font-semibold tracking-wide text-white/70">持っているアイテム</h2>
        <p className="mb-3 text-xs text-white/45">
          持っているものを選ぶと、それを使う専用クエストが出題されるようになります。何も選ばなくても通常のクエストは出題されます。
        </p>
        <div className="flex flex-col gap-3">
          {CATEGORY_LIST.map((cat) => {
            const catItems = ITEMS.filter((i) => i.category === cat.key)
            if (catItems.length === 0) return null
            return (
              <div key={cat.key}>
                <p className="mb-1.5 text-[11px]" style={{ color: cat.color }}>
                  {cat.label}
                </p>
                <div className="flex flex-wrap gap-2">
                  {catItems.map((item) => {
                    const active = inventory.includes(item.id)
                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => toggleItem(item.id)}
                        className="rounded-full border px-3 py-1.5 text-sm transition"
                        style={
                          active
                            ? { color: cat.color, borderColor: cat.color, backgroundColor: `${cat.color}22` }
                            : { color: 'rgba(255,255,255,0.5)', borderColor: 'rgba(255,255,255,0.15)' }
                        }
                      >
                        {item.icon} {item.label}
                      </button>
                    )
                  })}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      <div className="rpg-panel p-5 sm:p-6">
        <div className="mb-1 flex items-center justify-between">
          <h2 className="font-display section-title text-sm font-semibold tracking-wide text-white/70">常駐クエスト</h2>
          <button
            type="button"
            onClick={() => setShowResidentPicker(true)}
            className="rounded-lg border border-white/15 px-3 py-1.5 text-xs text-white/60 transition hover:border-white/30 hover:text-white/90"
          >
            + 選ぶ
          </button>
        </div>
        <p className="mb-3 text-xs text-white/45">
          毎日欠かさずやると決めたことを固定できます。抽選には左右されず、常に「今日のクエスト」に並びます。
        </p>
        {residentTemplateIds.length === 0 ? (
          <p className="text-xs text-white/40">まだ何も固定していません。</p>
        ) : (
          <div className="flex flex-col gap-2">
            {residentTemplateIds.map((templateId) => {
              const t = QUEST_TEMPLATES.find((q) => q.id === templateId)
              if (!t) return null
              return (
                <div key={templateId} className="flex items-center justify-between rounded-lg border border-white/10 bg-black/20 px-3 py-2">
                  <span className="text-sm text-white/80">{t.title}</span>
                  <button
                    type="button"
                    onClick={() => unpinResidentQuest(templateId)}
                    className="text-xs text-white/40 transition hover:text-[var(--color-ember-500)]"
                  >
                    固定解除
                  </button>
                </div>
              )
            })}
          </div>
        )}
      </div>

      <div className="rpg-panel p-5 sm:p-6">
        <h2 className="font-display section-title mb-1 text-sm font-semibold tracking-wide text-white/70">クエストの強度</h2>
        <p className="mb-3 text-xs text-white/45">高いほど負荷は上がりますが、獲得できる経験値・ステータスも増えます。</p>
        <div className="grid grid-cols-3 gap-2">
          {INTENSITIES.map((i) => (
            <button
              key={i}
              type="button"
              onClick={() => updateSettings({ intensity: i })}
              className={`rounded-lg border px-3 py-2 text-sm font-medium transition ${
                settings.intensity === i
                  ? 'border-[var(--color-gold-500)] bg-[var(--color-gold-500)]/15 text-[var(--color-gold-300)]'
                  : 'border-white/15 text-white/55 hover:border-white/30'
              }`}
            >
              {INTENSITY_LABEL[i]}
            </button>
          ))}
        </div>
      </div>

      <div className="rpg-panel p-5 sm:p-6">
        <h2 className="font-display section-title mb-1 text-sm font-semibold tracking-wide text-white/70">
          1日のクエスト数・{settings.dailyQuestCount}件
        </h2>
        <p className="mb-3 text-xs text-white/45">無理のない数から始めて、慣れてきたら増やしましょう。</p>
        <input
          type="range"
          min={1}
          max={6}
          value={settings.dailyQuestCount}
          onChange={(e) => updateSettings({ dailyQuestCount: Number(e.target.value) })}
          className="w-full accent-[var(--color-gold-500)]"
        />
      </div>

      <div className="rpg-panel p-5 sm:p-6">
        <h2 className="font-display section-title mb-1 text-sm font-semibold tracking-wide text-white/70">データのバックアップ</h2>
        <p className="mb-3 text-xs text-white/45">
          冒険の記録はこの端末のブラウザにのみ保存されています。機種変更やブラウザデータの消去に備えて、
          定期的にバックアップファイルを保存しておくことをおすすめします。
        </p>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={handleExport}
            className="rounded-lg border border-[var(--color-mana-500)]/50 bg-[var(--color-mana-500)]/10 px-4 py-2 text-sm font-semibold text-[var(--color-mana-400)] transition hover:bg-[var(--color-mana-500)]/25"
          >
            エクスポートする
          </button>
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="rounded-lg border border-white/15 px-4 py-2 text-sm text-white/60 transition hover:border-white/30 hover:text-white/90"
          >
            インポートする
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="application/json"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0]
              if (file) handleImportFile(file)
              e.target.value = ''
            }}
          />
        </div>
      </div>

      <div className="rpg-panel border-[var(--color-ember-600)]/40 p-5 sm:p-6">
        <h2 className="font-display section-title mb-1 text-sm font-semibold tracking-wide text-[var(--color-ember-400)]">
          データのリセット
        </h2>
        <p className="mb-3 text-xs text-white/45">
          レベル・ステータス・冒険の記録をすべて消去し、最初からやり直します。この操作は取り消せません。
        </p>
        <button
          type="button"
          onClick={() => setConfirmReset(true)}
          className="rounded-lg border border-[var(--color-ember-600)]/60 bg-[var(--color-ember-600)]/10 px-4 py-2 text-sm font-semibold text-[var(--color-ember-400)] transition hover:bg-[var(--color-ember-600)]/25"
        >
          すべてリセットする
        </button>
      </div>

      {showJobModal && <JobChangeModal onClose={() => setShowJobModal(false)} />}
      {showResidentPicker && (
        <ResidentQuestPickerModal onClose={() => setShowResidentPicker(false)} />
      )}
      {evolutionResult && (
        <JobEvolutionModal job={evolutionResult} onClose={() => setEvolutionResult(null)} />
      )}

      {confirmReset && (
        <Modal title="本当にリセットしますか?" onClose={() => setConfirmReset(false)}>
          <p className="mb-4 text-sm text-white/60">
            これまでの冒険の記録・レベル・ステータスがすべて消去されます。この操作は取り消せません。
          </p>
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setConfirmReset(false)}
              className="rounded-lg border border-white/15 px-4 py-2 text-sm text-white/60 hover:border-white/30"
            >
              キャンセル
            </button>
            <button
              type="button"
              onClick={() => {
                resetAll()
                setConfirmReset(false)
              }}
              className="rounded-lg border border-[var(--color-ember-600)]/60 bg-[var(--color-ember-600)]/20 px-4 py-2 text-sm font-semibold text-[var(--color-ember-400)] hover:bg-[var(--color-ember-600)]/35"
            >
              リセットする
            </button>
          </div>
        </Modal>
      )}
    </div>
  )
}
