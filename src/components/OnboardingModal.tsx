import { useState } from 'react'
import { useStore } from '../state/store'
import { CATEGORY_LIST, CATEGORIES } from '../data/categories'
import { EVOLUTION_LEVEL, pickRandomJob } from '../data/jobs'
import type { Category, Intensity } from '../types'
import { INTENSITY_LABEL } from '../utils/xp'

const INTENSITIES: Intensity[] = ['low', 'mid', 'high']

export function OnboardingModal() {
  const updateSettings = useStore((s) => s.updateSettings)
  const setJob = useStore((s) => s.setJob)
  const [step, setStep] = useState(0)
  const [name, setName] = useState('')
  const [interests, setInterests] = useState<Category[]>([])
  const [intensity, setIntensity] = useState<Intensity>('mid')
  const [revealedJob] = useState(() => pickRandomJob())

  function toggle(cat: Category) {
    setInterests((prev) => (prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]))
  }

  function finish() {
    setJob(revealedJob.id)
    updateSettings({
      adventurerName: name.trim() || '名もなき冒険者',
      interests,
      intensity,
      onboarded: true,
    })
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm">
      <div className="rpg-panel animate-rise relative w-full max-w-lg p-6 sm:p-8">
        <span className="rpg-corner tl" />
        <span className="rpg-corner tr" />
        <span className="rpg-corner bl" />
        <span className="rpg-corner br" />

        <p className="mb-1 text-center text-xs tracking-widest text-[var(--color-mana-400)]">CHARACTER CREATION</p>
        <h1 className="font-display glow-gold mb-6 text-center text-2xl font-bold text-[var(--color-gold-300)]">
          冒険の書を開く
        </h1>

        {step === 0 && (
          <div className="flex flex-col gap-4">
            <p className="text-sm text-white/60">
              これはあなたが本気で成長するための冒険録です。クエストをこなした記録は、ここに刻まれ続けます。
              まず、あなたの名を教えてください。
            </p>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              maxLength={20}
              placeholder="冒険者名(未入力でも進めます)"
              autoFocus
              className="w-full rounded-lg border border-white/15 bg-black/30 px-3 py-2.5 text-sm text-white/90 outline-none focus:border-[var(--color-mana-500)]"
            />
            <button
              type="button"
              onClick={() => setStep(1)}
              className="mt-2 rounded-lg border border-[var(--color-gold-500)]/60 bg-[var(--color-gold-500)]/15 px-4 py-2.5 text-sm font-semibold text-[var(--color-gold-300)] transition hover:bg-[var(--color-gold-500)]/30"
            >
              次へ
            </button>
          </div>
        )}

        {step === 1 && (
          <div className="flex flex-col gap-4">
            <p className="text-sm text-white/60">
              特に伸ばしたい分野があれば選んでください。あとから設定でいつでも変更できます。何も選ばなくても構いません。
            </p>
            <div className="flex flex-wrap gap-2">
              {CATEGORY_LIST.map((c) => {
                const active = interests.includes(c.key)
                return (
                  <button
                    key={c.key}
                    type="button"
                    onClick={() => toggle(c.key)}
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
            <div className="mt-2 flex gap-2">
              <button
                type="button"
                onClick={() => setStep(0)}
                className="rounded-lg border border-white/15 px-4 py-2.5 text-sm text-white/60 hover:border-white/30"
              >
                戻る
              </button>
              <button
                type="button"
                onClick={() => setStep(2)}
                className="flex-1 rounded-lg border border-[var(--color-gold-500)]/60 bg-[var(--color-gold-500)]/15 px-4 py-2.5 text-sm font-semibold text-[var(--color-gold-300)] transition hover:bg-[var(--color-gold-500)]/30"
              >
                次へ
              </button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="flex flex-col gap-4">
            <p className="text-sm text-white/60">最初のクエストの強度を選んでください。</p>
            <div className="grid grid-cols-3 gap-2">
              {INTENSITIES.map((i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setIntensity(i)}
                  className={`rounded-lg border px-3 py-2 text-sm font-medium transition ${
                    intensity === i
                      ? 'border-[var(--color-gold-500)] bg-[var(--color-gold-500)]/15 text-[var(--color-gold-300)]'
                      : 'border-white/15 text-white/55 hover:border-white/30'
                  }`}
                >
                  {INTENSITY_LABEL[i]}
                </button>
              ))}
            </div>
            <p className="text-xs text-white/40">迷ったら「標準」で始めるのがおすすめです。あとから変更できます。</p>
            <div className="mt-2 flex gap-2">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="rounded-lg border border-white/15 px-4 py-2.5 text-sm text-white/60 hover:border-white/30"
              >
                戻る
              </button>
              <button
                type="button"
                onClick={() => setStep(3)}
                className="flex-1 rounded-lg border border-[var(--color-gold-500)]/60 bg-[var(--color-gold-500)]/15 px-4 py-2.5 text-sm font-semibold text-[var(--color-gold-300)] transition hover:bg-[var(--color-gold-500)]/30"
              >
                次へ
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="flex flex-col gap-4">
            <p className="text-center text-xs tracking-widest text-[var(--color-mana-400)]">
              運命のジョブ判定...
            </p>
            <div className="rpg-panel animate-rise flex flex-col items-center gap-2 p-6">
              <span className="animate-pulse-glow flex h-20 w-20 items-center justify-center rounded-full border-2 border-[var(--color-gold-500)] text-4xl">
                {revealedJob.emblem}
              </span>
              {revealedJob.rarity === 'rare' && (
                <span className="rounded-full border border-[var(--color-gold-500)]/60 px-2 py-0.5 text-[10px] text-[var(--color-gold-400)]">
                  ユニークジョブ
                </span>
              )}
              <h2 className="font-display glow-gold text-xl font-bold text-[var(--color-gold-300)]">
                {revealedJob.name}
              </h2>
              <p className="text-center text-sm text-white/60">{revealedJob.description}</p>
              <p className="text-xs text-white/40">
                得意分野:{' '}
                {revealedJob.affinities.map((c) => CATEGORIES[c].label).join('・')}
                (対応クエストの報酬+{revealedJob.tier === 2 ? 35 : 20}%)
              </p>
            </div>
            <p className="text-xs text-white/40">
              レベル{EVOLUTION_LEVEL}に達すると昇級試練に挑戦できます。突破すると、ジョブチェンジや上位職への進化が可能になります。
            </p>
            <div className="mt-2 flex gap-2">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="rounded-lg border border-white/15 px-4 py-2.5 text-sm text-white/60 hover:border-white/30"
              >
                戻る
              </button>
              <button
                type="button"
                onClick={finish}
                className="flex-1 rounded-lg border border-[var(--color-gold-500)]/60 bg-[var(--color-gold-500)]/20 px-4 py-2.5 text-sm font-semibold text-[var(--color-gold-300)] transition hover:bg-[var(--color-gold-500)]/35"
              >
                冒険を始める
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
