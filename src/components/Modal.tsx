import type { ReactNode } from 'react'

export function Modal({
  title,
  onClose,
  children,
}: {
  title: string
  onClose: () => void
  children: ReactNode
}) {
  return (
    <div
      className="fixed inset-0 z-40 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="rpg-panel animate-rise relative max-h-[85vh] w-full max-w-lg overflow-y-auto p-5 sm:p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <span className="rpg-corner tl" />
        <span className="rpg-corner tr" />
        <span className="rpg-corner bl" />
        <span className="rpg-corner br" />
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-display glow-gold text-lg font-bold text-[var(--color-gold-300)]">{title}</h2>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full px-2 py-1 text-white/50 transition hover:text-white"
            aria-label="閉じる"
          >
            ✕
          </button>
        </div>
        {children}
      </div>
    </div>
  )
}
