const WEEKDAYS = ['日', '月', '火', '水', '木', '金', '土']

export function formatDateJp(iso: string): string {
  const d = new Date(iso)
  return `${d.getMonth() + 1}月${d.getDate()}日(${WEEKDAYS[d.getDay()]})`
}

export function formatTimeJp(iso: string): string {
  const d = new Date(iso)
  return `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`
}

export function formatDateKeyJp(dateKey: string): string {
  const [, m, d] = dateKey.split('-')
  const date = new Date(dateKey)
  return `${Number(m)}月${Number(d)}日(${WEEKDAYS[date.getDay()]})`
}
