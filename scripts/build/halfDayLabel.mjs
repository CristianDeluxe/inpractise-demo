import { monthNames } from './monthNames.mjs'

export function halfDayLabel(key) {
  const [, month = '1', day = '1', half = 'am'] = key.split('-')
  const monthName = monthNames[Number(month) - 1] ?? month
  const period = half === 'am' ? 'before noon' : 'after noon'
  return `${Number(day)} ${monthName}, ${period}`
}
