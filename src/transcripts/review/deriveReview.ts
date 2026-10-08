import type { CorrectionRun } from '../contracts/CorrectionRun'
import type { TranscriptDocument } from '../contracts/TranscriptDocument'
import { correctedParagraphMap } from './correctedParagraphMap'
import { listEdits } from './listEdits'
import { needsAttention } from './needsAttention'
import type { ReviewDerived } from './ReviewDerived'

export function deriveReview(
  transcript: TranscriptDocument,
  correction: CorrectionRun | null,
): ReviewDerived {
  const correctedById = correctedParagraphMap(correction)
  return {
    correctedById,
    edits: listEdits(correction),
    flaggedIds: transcript.paragraphs
      .filter((paragraph) =>
        needsAttention(paragraph, correctedById.get(paragraph.id)),
      )
      .map((paragraph) => paragraph.id),
  }
}
