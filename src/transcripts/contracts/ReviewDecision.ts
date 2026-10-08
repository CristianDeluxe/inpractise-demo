import type { ReviewVerdict } from './ReviewVerdict'

/** Stored in work/transcripts/<id>/review.json as an array. */
export type ReviewDecision = {
  readonly editId: string
  readonly verdict: ReviewVerdict
  readonly decidedAt: string
}
