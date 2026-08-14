import { createContext, useCallback, useContext, useRef, useState, type ReactNode } from 'react'

type ToastVariant = 'default' | 'levelup' | 'rankup'

interface ToastItem {
  id: number
  message: string
  sub?: string
  variant: ToastVariant
}

interface ToastContextValue {
  pushToast: (message: string, sub?: string, variant?: ToastVariant) => void
}

const ToastContext = createContext<ToastContextValue | null>(null)

const VARIANT_STYLE: Record<ToastVariant, { icon: string; duration: number; className: string }> = {
  default: { icon: '✨', duration: 2600, className: '' },
  levelup: {
    icon: '⭐',
    duration: 3400,
    className: 'animate-pulse-glow border-[var(--color-gold-400)]',
  },
  rankup: {
    icon: '👑',
    duration: 3400,
    className: 'animate-pulse-glow border-[var(--color-mana-400)]',
  },
}

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([])
  const counter = useRef(0)

  const pushToast = useCallback((message: string, sub?: string, variant: ToastVariant = 'default') => {
    const id = counter.current++
    setToasts((prev) => [...prev, { id, message, sub, variant }])
    window.setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id))
    }, VARIANT_STYLE[variant].duration)
  }, [])

  return (
    <ToastContext.Provider value={{ pushToast }}>
      {children}
      <div className="pointer-events-none fixed inset-x-0 top-4 z-50 flex flex-col items-center gap-2">
        {toasts.map((t) => {
          const style = VARIANT_STYLE[t.variant]
          return (
            <div
              key={t.id}
              className={`animate-toast rpg-panel pointer-events-none flex items-center gap-3 rounded-full px-5 py-2.5 shadow-2xl ${style.className}`}
            >
              <span className="text-lg">{style.icon}</span>
              <div className="text-left">
                <p className="font-display glow-gold text-sm font-semibold text-[var(--color-gold-300)]">
                  {t.message}
                </p>
                {t.sub && <p className="font-num text-xs text-[var(--color-mana-400)]">{t.sub}</p>}
              </div>
            </div>
          )
        })}
      </div>
    </ToastContext.Provider>
  )
}

export function useToast(): ToastContextValue {
  const ctx = useContext(ToastContext)
  if (!ctx) throw new Error('useToast must be used within ToastProvider')
  return ctx
}
