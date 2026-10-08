import type { CorrectionRun } from '../contracts/CorrectionRun'
import type { TranscriptDocument } from '../contracts/TranscriptDocument'
import { correctedParagraphMap } from './correctedParagraphMap'
import { layoutParagraphEdits } from './layoutParagraphEdits'
import { needsAttention } from './needsAttention'
import type { ReviewDerived } from './ReviewDerived'

export function deriveReview(
  transcript: TranscriptDocument,
  correction: CorrectionRun | null,
): ReviewDerived {
  const correctedById = correctedParagraphMap(correction)
  const layouts = transcript.paragraphs.flatMap((paragraph) => {
    const corrected = correctedById.get(paragraph.id)
    return corrected ? [layoutParagraphEdits(paragraph, corrected)] : []
  })
  return {
    correctedById,
    edits: layouts.flatMap((layout) => layout.edits),
    spanById: new Map(layouts.flatMap((layout) => layout.spans)),
    flaggedIds: transcript.paragraphs
      .filter((paragraph) =>
        needsAttention(paragraph, correctedById.get(paragraph.id)),
      )
      .map((paragraph) => paragraph.id),
  }
}
