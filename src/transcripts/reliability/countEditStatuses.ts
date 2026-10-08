import type { CorrectionRun } from '@/transcripts/contracts/CorrectionRun'
import type { TranscriptDocument } from '@/transcripts/contracts/TranscriptDocument'
import { placeEdits } from '@/transcripts/edits/placeEdits'
import { correctedParagraphMap } from '@/transcripts/review/correctedParagraphMap'
import type { DecisionMap } from '@/transcripts/review/DecisionMap'
import { paragraphRawText } from '@/transcripts/review/paragraphRawText'
import type { EditCounts } from './EditCounts'
import { statusOfEdit } from './statusOfEdit'

export function countEditStatuses(
  transcript: TranscriptDocument,
  correction: CorrectionRun | null,
  decisions: DecisionMap,
): EditCounts {
  const counts = { accepted: 0, rejected: 0, auto: 0, uncertain: 0 }
  const corrected = correctedParagraphMap(correction)
  for (const paragraph of transcript.paragraphs) {
    const edits = corrected.get(paragraph.id)?.edits ?? []
    const placed = new Set(
      placeEdits(paragraphRawText(paragraph), edits).map(
        (placement) => placement.edit.id,
      ),
    )
    for (const edit of edits) {
      const status = statusOfEdit(edit, decisions)
      counts[
        status === 'auto' && !placed.has(edit.id) ? 'uncertain' : status
      ] += 1
    }
  }
  return counts
}
