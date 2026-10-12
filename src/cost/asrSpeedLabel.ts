import type { CostRow } from './CostRow'

/** Recognition time and how many times faster than the audio plays it ran. */
export function asrSpeedLabel(row: CostRow): string {
  const seconds = `${String(row.asrSeconds)} s`
  if (row.asrSeconds <= 0) return seconds
  return `${seconds} (${String(Math.round(row.audioSeconds / row.asrSeconds))}x real time)`
}
