import type { CorrectionRun } from '../contracts/CorrectionRun'
import type { TranscriptDocument } from '../contracts/TranscriptDocument'
import { isSpotCheckEdit } from '../reliability/isSpotCheckEdit'
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
  const edits = layouts.flatMap((layout) => layout.edits)
  const spotCheckEdits = edits.filter(isSpotCheckEdit)
  const spotParagraphs = new Set(spotCheckEdits.map((edit) => edit.paragraphId))
  return {
    correctedById,
    edits,
    spanById: new Map(layouts.flatMap((layout) => layout.spans)),
    flaggedIds: transcript.paragraphs
      .filter((paragraph) =>
        needsAttention(paragraph, correctedById.get(paragraph.id)),
      )
      .map((paragraph) => paragraph.id),
    spotCheckEdits,
    spotCheckIds: transcript.paragraphs
      .filter((paragraph) => spotParagraphs.has(paragraph.id))
      .map((paragraph) => paragraph.id),
  }
}
