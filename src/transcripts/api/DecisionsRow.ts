import type { ReviewDecision } from '../contracts/ReviewDecision'

/** The columns of lab_reviews the lab reads. */
export type DecisionsRow = {
  readonly transcript_id: string
  readonly decisions: readonly ReviewDecision[]
}
