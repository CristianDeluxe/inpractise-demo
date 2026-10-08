import type { CorrectedParagraph } from '../contracts/CorrectedParagraph'
import type { TranscriptParagraph } from '../contracts/TranscriptParagraph'
import { placeEdits } from '../edits/placeEdits'
import type { ParagraphEditLayout } from './ParagraphEditLayout'
import { paragraphRawText } from './paragraphRawText'
import { placementInterval } from './placementInterval'
import type { TimeInterval } from './TimeInterval'

/** Edits ordered by where they first appear (unplaceable ones last), each with its audio span. */
export function layoutParagraphEdits(
  paragraph: TranscriptParagraph,
  corrected: CorrectedParagraph,
): ParagraphEditLayout {
  const placements = placeEdits(paragraphRawText(paragraph), corrected.edits)
  const spans = new Map<string, TimeInterval>()
  for (const placement of placements) {
    const interval = placementInterval(paragraph, placement)
    if (interval && !spans.has(placement.edit.id))
      spans.set(placement.edit.id, interval)
  }
  const placed = [...new Set(placements.map((placement) => placement.edit))]
  const unplaced = corrected.edits.filter((edit) => !placed.includes(edit))
  return { edits: [...placed, ...unplaced], spans: [...spans] }
}
