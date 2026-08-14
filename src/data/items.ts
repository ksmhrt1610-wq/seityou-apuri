import type { ItemInfo } from '../types'

export const ITEMS: ItemInfo[] = [
  // STR
  { id: 'dumbbell', label: 'ダンベル', icon: '🏋️', category: 'STR' },
  { id: 'ab-roller', label: '腹筋ローラー', icon: '🛞', category: 'STR' },
  { id: 'resistance-band', label: '筋トレチューブ', icon: '➰', category: 'STR' },
  { id: 'jump-rope', label: '縄跳び', icon: '🪢', category: 'STR' },
  { id: 'yoga-mat', label: 'ヨガマット', icon: '🧘', category: 'STR' },
  // VIT
  { id: 'scale', label: '体重計', icon: '⚖️', category: 'VIT' },
  { id: 'water-bottle', label: 'マイボトル', icon: '🧴', category: 'VIT' },
  // INT
  { id: 'textbook', label: '参考書・教材', icon: '📚', category: 'INT' },
  { id: 'laptop', label: 'PC・タブレット', icon: '💻', category: 'INT' },
  { id: 'flashcards', label: '単語帳', icon: '🗂️', category: 'INT' },
  // WIL
  { id: 'notebook', label: '手帳・日記帳', icon: '📔', category: 'WIL' },
  { id: 'meditation-cushion', label: '瞑想クッション', icon: '🧎', category: 'WIL' },
  // CHA
  { id: 'mirror', label: '姿見・鏡', icon: '🪞', category: 'CHA' },
  // DEX
  { id: 'sewing-kit', label: '裁縫道具', icon: '🧵', category: 'DEX' },
  { id: 'instrument', label: '楽器', icon: '🎸', category: 'DEX' },
  { id: 'cookware', label: '調理器具一式', icon: '🍳', category: 'DEX' },
  { id: 'cleaning-kit', label: '掃除用具一式', icon: '🧹', category: 'DEX' },
  { id: 'sketchbook', label: 'スケッチブック・画材', icon: '🎨', category: 'DEX' },
]

export const ITEM_MAP: Record<string, ItemInfo> = Object.fromEntries(ITEMS.map((i) => [i.id, i]))

export function getItem(itemId: string): ItemInfo | undefined {
  return ITEM_MAP[itemId]
}
