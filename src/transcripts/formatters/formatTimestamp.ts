import { padTime } from './padTime'

export function formatTimestamp(totalSeconds: number) {
  const seconds = Math.max(0, Math.floor(totalSeconds))
  const hours = Math.floor(seconds / 3600)
  const minutes = Math.floor((seconds % 3600) / 60)
  const rest = seconds % 60
  return hours > 0
    ? `${String(hours)}:${padTime(minutes)}:${padTime(rest)}`
    : `${padTime(minutes)}:${padTime(rest)}`
}
