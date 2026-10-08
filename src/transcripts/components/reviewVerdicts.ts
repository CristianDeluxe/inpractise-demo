import type { ReviewVerdict } from '../contracts/ReviewVerdict'

/** The verdict toggles in the order they are offered. */
export const reviewVerdicts: readonly ReviewVerdict[] = [
  'accepted',
  'rejected',
  'deferred',
]
