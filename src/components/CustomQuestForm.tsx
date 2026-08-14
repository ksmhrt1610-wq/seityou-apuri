import { useState } from 'react'
import { Modal } from './Modal'
import { useStore } from '../state/store'
import { CATEGORY_LIST } from '../data/categories'
import type { Category, Intensity, Rank } from '../types'
import { RANK_ORDER, INTENSITY_LABEL, computeReward } from '../utils/xp'

export function CustomQuestForm({ onClose }: { onClose: () => void }) {
  const addCustomQuest = useStore((s) => s.addCustomQuest)
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState<Category>('STR')
  const [rank, setRank] = useState<Rank>('E')
  const [intensity, setIntensity] = useState<Intensity>('mid')
  const [estMinutes, setEstMinutes] = useState(15)

  const reward = computeReward(rank, intensity)
  const canSubmit = title.trim().length > 0

  function handleSubmit() {
    if (!canSubmit) return
    addCustomQuest({
      title: title.trim(),
      description: description.trim() || '自分で設定したクエスト。',
      category,
      rank,
      intensity,
      estMinutes,
    })
    onClose()
  }

  return (
    <Modal title="クエストを自作する" onClose={onClose}>
      <div className="flex flex-col gap-4">
        <label className="block">
          <span className="mb-1 block text-xs text-white/60">クエスト名</span>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            maxLength={40}
            placeholder="例）部屋の本棚を整理する"
            className="w-full rounded-lg border border-white/15 bg-black/30 px-3 py-2 text-sm text-white/90 outline-none focus:border-[var(--color-mana-500)]"
          />
        </label>

        <label className="block">
          <span className="mb-1 block text-xs text-white/60">詳細(任意)</span>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            maxLength={120}
            rows={2}
            placeholder="どんな行動をするか具体的に"
            className="w-full resize-none rounded-lg border border-white/15 bg-black/30 px-3 py-2 text-sm text-white/90 outline-none focus:border-[var(--color-mana-500)]"
          />
        </label>

        <div className="grid grid-cols-2 gap-3">
          <label className="block">
            <span className="mb-1 block text-xs text-white/60">カテゴリ</span>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as Category)}
              className="w-full rounded-lg border border-white/15 bg-black/30 px-3 py-2 text-sm text-white/90 outline-none focus:border-[var(--color-mana-500)]"
            >
              {CATEGORY_LIST.map((c) => (
                <option key={c.key} value={c.key}>
                  {c.label}
                </option>
              ))}
            </select>
          </label>

          <label className="block">
            <span className="mb-1 block text-xs text-white/60">目安時間(分)</span>
            <input
              type="number"
              min={0}
              max={600}
              value={estMinutes}
              onChange={(e) => setEstMinutes(Number(e.target.value))}
              className="w-full rounded-lg border border-white/15 bg-black/30 px-3 py-2 text-sm text-white/90 outline-none focus:border-[var(--color-mana-500)]"
            />
          </label>

          <label className="block">
            <span className="mb-1 block text-xs text-white/60">難易度ランク</span>
            <select
              value={rank}
              onChange={(e) => setRank(e.target.value as Rank)}
              className="w-full rounded-lg border border-white/15 bg-black/30 px-3 py-2 text-sm text-white/90 outline-none focus:border-[var(--color-mana-500)]"
            >
              {RANK_ORDER.map((r) => (
                <option key={r} value={r}>
                  {r}
                </option>
              ))}
            </select>
          </label>

          <label className="block">
            <span className="mb-1 block text-xs text-white/60">強度</span>
            <select
              value={intensity}
              onChange={(e) => setIntensity(e.target.value as Intensity)}
              className="w-full rounded-lg border border-white/15 bg-black/30 px-3 py-2 text-sm text-white/90 outline-none focus:border-[var(--color-mana-500)]"
            >
              {(Object.keys(INTENSITY_LABEL) as Intensity[]).map((i) => (
                <option key={i} value={i}>
                  {INTENSITY_LABEL[i]}
                </option>
              ))}
            </select>
          </label>
        </div>

        <p className="font-num text-xs text-white/50">
          報酬目安:{' '}
          <span className="text-[var(--color-mana-400)]">+{reward.xp} EXP</span> /{' '}
          <span style={{ color: CATEGORY_LIST.find((c) => c.key === category)?.color }}>
            +{reward.stat} {category}
          </span>
        </p>

        <button
          type="button"
          disabled={!canSubmit}
          onClick={handleSubmit}
          className="rounded-lg border border-[var(--color-gold-500)]/60 bg-[var(--color-gold-500)]/15 px-4 py-2 text-sm font-semibold text-[var(--color-gold-300)] transition hover:bg-[var(--color-gold-500)]/30 disabled:cursor-not-allowed disabled:opacity-40"
        >
          今日のクエストボードに追加する
        </button>
      </div>
    </Modal>
  )
}
