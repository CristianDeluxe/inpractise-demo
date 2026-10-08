import { useMemo } from 'react'
import type { CorrectionRun } from '../contracts/CorrectionRun'
import type { TranscriptDocument } from '../contracts/TranscriptDocument'
import { deriveReview } from '../review/deriveReview'

export function useReviewDerived(
  transcript: TranscriptDocument,
  correction: CorrectionRun | null,
) {
  return useMemo(
    () => deriveReview(transcript, correction),
    [transcript, correction],
  )
}
