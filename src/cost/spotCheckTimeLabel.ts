import type { CostRow } from './CostRow'
import { formatReviewerMinutes } from './formatters/formatReviewerMinutes'

/** Estimated spot-check time and its rate per audio hour, once decision timestamps can measure it. */
export function spotCheckTimeLabel(row: CostRow): string {
  if (
    row.reviewerSeconds === undefined ||
    row.minutesPerAudioHour === undefined
  )
    return 'time not measured yet'
  return `${formatReviewerMinutes(row.reviewerSeconds / 60)}, ${formatReviewerMinutes(row.minutesPerAudioHour)} per audio hour`
}
