import type { CostRow } from './CostRow'
import { minutesPerAudioHour } from './minutesPerAudioHour'

/**
 * Pools only the transcripts whose reviewer time was measured, so audio that
 * nobody has reviewed yet cannot dilute the figure.
 */
export function totalMinutesPerAudioHour(
  rows: readonly CostRow[],
): number | undefined {
  const measured = rows.filter((row) => row.reviewerSeconds !== undefined)
  if (measured.length === 0) return undefined
  const reviewerSeconds = measured.reduce(
    (total, row) => total + (row.reviewerSeconds ?? 0),
    0,
  )
  const audioSeconds = measured.reduce(
    (total, row) => total + row.audioSeconds,
    0,
  )
  return minutesPerAudioHour(reviewerSeconds, audioSeconds)
}
