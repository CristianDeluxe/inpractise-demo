import { reviewSecondsPerSpan } from './reviewSecondsPerSpan'

export function estimateReviewMinutes(flaggedSpans: number) {
  return Math.max(1, Math.round((flaggedSpans * reviewSecondsPerSpan) / 60))
}
