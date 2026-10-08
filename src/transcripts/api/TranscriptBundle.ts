import type { CorrectionRun } from '../contracts/CorrectionRun'
import type { ReviewDecision } from '../contracts/ReviewDecision'
import type { TranscriptDocument } from '../contracts/TranscriptDocument'

/** Everything the review and report pages need for one transcript. */
export type TranscriptBundle = {
  readonly transcript: TranscriptDocument
  readonly correction: CorrectionRun | null
  readonly review: readonly ReviewDecision[]
}
