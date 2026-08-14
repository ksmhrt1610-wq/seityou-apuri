import type { Category, CategoryInfo } from '../types'

export const CATEGORIES: Record<Category, CategoryInfo> = {
  STR: {
    key: 'STR',
    label: '筋力',
    short: 'STR',
    description: '運動・筋トレ・身体を鍛える行動',
    color: '#ff6b4a',
  },
  VIT: {
    key: 'VIT',
    label: '体力',
    short: 'VIT',
    description: '睡眠・食事・健康など生活の土台',
    color: '#6fcf7d',
  },
  INT: {
    key: 'INT',
    label: '知力',
    short: 'INT',
    description: '学習・読書・資格など知識を積む行動',
    color: '#3fb6f0',
  },
  WIL: {
    key: 'WIL',
    label: '精神力',
    short: 'WIL',
    description: '習慣化・内省・自己管理の力',
    color: '#b07bf0',
  },
  CHA: {
    key: 'CHA',
    label: '魅力',
    short: 'CHA',
    description: 'コミュニケーション・身だしなみ・対人',
    color: '#f6d375',
  },
  DEX: {
    key: 'DEX',
    label: '器用',
    short: 'DEX',
    description: '実務スキル・創作・生活の技術',
    color: '#ff9d6b',
  },
}

export const CATEGORY_LIST: CategoryInfo[] = Object.values(CATEGORIES)
