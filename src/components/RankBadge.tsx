import type { Rank } from '../types'
import { RANK_COLOR } from '../utils/xp'

const SIZE_MAP = {
  sm: { box: 36, font: 'text-base' },
  md: { box: 52, font: 'text-xl' },
  lg: { box: 76, font: 'text-3xl' },
} as const

export function RankBadge({ rank, size = 'md' }: { rank: Rank; size?: keyof typeof SIZE_MAP }) {
  const color = RANK_COLOR[rank]
  const { box, font } = SIZE_MAP[size]
  return (
    <div
      className="relative flex shrink-0 items-center justify-center"
      style={{ width: box, height: box }}
      title={`ギルドランク ${rank}`}
    >
      <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full drop-shadow-lg">
        <polygon
          points="50,3 93,25 93,75 50,97 7,75 7,25"
          fill="rgba(10,13,28,0.9)"
          stroke={color}
          strokeWidth="4"
        />
        <polygon
          points="50,12 85,30 85,70 50,88 15,70 15,30"
          fill="none"
          stroke={color}
          strokeOpacity="0.4"
          strokeWidth="1.5"
        />
      </svg>
      <span
        className={`font-display relative font-bold ${font}`}
        style={{ color, textShadow: `0 0 10px ${color}` }}
      >
        {rank}
      </span>
    </div>
  )
}
