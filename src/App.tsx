import { useEffect, useState } from 'react'
import { useStore } from './state/store'
import { StatusPage } from './pages/StatusPage'
import { QuestPage } from './pages/QuestPage'
import { LogPage } from './pages/LogPage'
import { SettingsPage } from './pages/SettingsPage'
import { OnboardingModal } from './components/OnboardingModal'
import { ToastProvider } from './components/Toast'
import { RankBadge } from './components/RankBadge'
import { guildRankFromLevel, levelFromTotalXp } from './utils/xp'

type Tab = 'status' | 'quest' | 'log' | 'settings'

const TABS: { key: Tab; label: string; icon: string }[] = [
  { key: 'status', label: 'ステータス', icon: '🛡️' },
  { key: 'quest', label: 'クエスト', icon: '📜' },
  { key: 'log', label: '記録', icon: '📖' },
  { key: 'settings', label: '設定', icon: '⚙️' },
]

function AppShell() {
  const [tab, setTab] = useState<Tab>('status')
  const onboarded = useStore((s) => s.settings.onboarded)
  const ensureTodayBoard = useStore((s) => s.ensureTodayBoard)
  const totalXp = useStore((s) => s.character.totalXp)
  const adventurerName = useStore((s) => s.settings.adventurerName)

  useEffect(() => {
    if (!onboarded) return
    ensureTodayBoard()
    const interval = window.setInterval(() => ensureTodayBoard(), 60_000)
    function onVisible() {
      if (document.visibilityState === 'visible') ensureTodayBoard()
    }
    document.addEventListener('visibilitychange', onVisible)
    return () => {
      window.clearInterval(interval)
      document.removeEventListener('visibilitychange', onVisible)
    }
  }, [ensureTodayBoard, onboarded])

  const level = levelFromTotalXp(totalXp).level
  const rank = guildRankFromLevel(level)

  if (!onboarded) return <OnboardingModal />

  return (
    <div className="relative flex min-h-screen flex-col">
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div className="absolute -top-32 -left-32 h-96 w-96 rounded-full bg-[var(--color-mana-500)]/10 blur-3xl" />
        <div className="absolute top-1/3 -right-40 h-[28rem] w-[28rem] rounded-full bg-[var(--color-gold-500)]/8 blur-3xl" />
        <div className="absolute -bottom-40 left-1/4 h-96 w-96 rounded-full bg-[var(--color-ember-600)]/8 blur-3xl" />
      </div>

      <header className="sticky top-0 z-30 border-b border-white/10 bg-[var(--color-void-950)]/85 backdrop-blur-md">
        <div className="mx-auto flex max-w-2xl items-center gap-3 px-4 py-3">
          <RankBadge rank={rank} size="sm" />
          <div className="min-w-0 flex-1">
            <p className="font-display truncate text-sm font-semibold text-white/85">{adventurerName}</p>
            <p className="text-[11px] text-white/40">Lv.{level}</p>
          </div>
          <p className="font-display glow-gold text-sm font-bold tracking-wide text-[var(--color-gold-400)]">
            成長の書
          </p>
        </div>
      </header>

      <main className="relative z-10 flex-1 px-4 pt-5 pb-24">
        {tab === 'status' && <StatusPage />}
        {tab === 'quest' && <QuestPage />}
        {tab === 'log' && <LogPage />}
        {tab === 'settings' && <SettingsPage />}
      </main>

      <nav className="fixed inset-x-0 bottom-0 z-30 border-t border-white/10 bg-[var(--color-void-950)]/95 backdrop-blur-md">
        <div className="mx-auto flex max-w-2xl">
          {TABS.map((t) => (
            <button
              key={t.key}
              type="button"
              onClick={() => setTab(t.key)}
              className={`flex flex-1 flex-col items-center gap-0.5 py-2.5 text-xs transition ${
                tab === t.key ? 'text-[var(--color-gold-300)]' : 'text-white/40 hover:text-white/70'
              }`}
            >
              <span className="text-lg leading-none">{t.icon}</span>
              {t.label}
              {tab === t.key && <span className="mt-0.5 h-0.5 w-6 rounded-full bg-[var(--color-gold-500)]" />}
            </button>
          ))}
        </div>
      </nav>
    </div>
  )
}

export default function App() {
  return (
    <ToastProvider>
      <AppShell />
    </ToastProvider>
  )
}
