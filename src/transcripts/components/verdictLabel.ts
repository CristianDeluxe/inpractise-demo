import type { ReviewVerdict } from '../contracts/ReviewVerdict'

/** How a verdict reads in labels and summaries. */
export function verdictLabel(verdict: ReviewVerdict | undefined) {
  if (verdict === 'deferred') return 'flagged for later'
  return verdict ?? 'pending'
}
