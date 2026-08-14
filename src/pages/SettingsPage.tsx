import { useRef, useState } from 'react'
import { useStore } from '../state/store'
import { CATEGORY_LIST, CATEGORIES } from '../data/categories'
import { ITEMS } from '../data/items'
import { getJob } from '../data/jobs'
import type { Category, Intensity } from '../types'
import { INTENSITY_LABEL } from '../utils/xp'
import { Modal } from '../components/Modal'
import { JobChangeModal } from '../components/JobChangeModal'
import { useToast } from '../components/Toast'

const INTENSITIES: Intensity[] = ['low', 'mid', 'high']

export function SettingsPage() {
  const settings = useStore((s) => s.settings)
  const updateSettings = useStore((s) => s.updateSettings)
  const resetAll = useStore((s) => s.resetAll)
  const exportData = useStore((s) => s.exportData)
  const importData = useStore((s) => s.importData)
  const jobId = useStore((s) => s.character.jobId)
  const inventory = useStore((s) => s.inventory)
  const addItem = useStore((s) => s.addItem)
  const removeItem = useStore((s) => s.removeItem)
  const [confirmReset, setConfirmReset] = useState(false)
  const [nameDraft, setNameDraft] = useState(settings.adventurerName)
  const [showJobModal, setShowJobModal] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const { pushToast } = useToast()
  const job = getJob(jobId)

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
        <h2 className="font-display mb-3 text-sm font-semibold tracking-wide text-white/70">冒険者名</h2>
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
        <h2 className="font-display mb-3 text-sm font-semibold tracking-wide text-white/70">ジョブ</h2>
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
              得意: {job.affinities.map((c) => CATEGORIES[c].label).join('・')}(報酬+20%)
            </p>
          </div>
          <button
            type="button"
            onClick={() => setShowJobModal(true)}
            className="shrink-0 rounded-lg border border-white/15 px-3 py-1.5 text-xs text-white/60 transition hover:border-white/30 hover:text-white/90"
          >
            ジョブチェンジ
          </button>
        </div>
      </div>

      <div className="rpg-panel p-5 sm:p-6">
        <h2 className="font-display mb-1 text-sm font-semibold tracking-wide text-white/70">得意にしたい分野</h2>
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
        <h2 className="font-display mb-1 text-sm font-semibold tracking-wide text-white/70">持っているアイテム</h2>
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
        <h2 className="font-display mb-1 text-sm font-semibold tracking-wide text-white/70">クエストの強度</h2>
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
        <h2 className="font-display mb-1 text-sm font-semibold tracking-wide text-white/70">
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
        <h2 className="font-display mb-1 text-sm font-semibold tracking-wide text-white/70">データのバックアップ</h2>
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
        <h2 className="font-display mb-1 text-sm font-semibold tracking-wide text-[var(--color-ember-400)]">
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
