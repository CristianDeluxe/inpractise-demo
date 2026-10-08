import { reviewerGapLimitSeconds } from './reviewerGapLimitSeconds'

/**
 * Active review time estimated from decision timestamps: the sum of the gaps
 * between consecutive decisions, ignoring any gap above the limit. Fewer than
 * two readable timestamps measure nothing, so the answer is undefined rather
 * than zero.
 */
export function estimateReviewerSeconds(
  decidedAt: readonly string[],
): number | undefined {
  const times = decidedAt
    .map((value) => Date.parse(value))
    .filter((time) => Number.isFinite(time))
    .sort((left, right) => left - right)
  if (times.length < 2) return undefined
  return times.slice(1).reduce((total, time, index) => {
    const gap = (time - (times[index] ?? time)) / 1000
    return gap <= reviewerGapLimitSeconds ? total + gap : total
  }, 0)
}
