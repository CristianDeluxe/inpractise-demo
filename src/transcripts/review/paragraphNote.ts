import type { CorrectedParagraph } from '../contracts/CorrectedParagraph'
import type { TranscriptParagraph } from '../contracts/TranscriptParagraph'

/** Short margin note: how many risky words and proposed edits the paragraph holds. */
export function paragraphNote(
  paragraph: TranscriptParagraph,
  corrected: CorrectedParagraph | undefined,
) {
  const low = paragraph.words.filter((word) => word.band === 'low').length
  const edits = corrected?.edits.length ?? 0
  const parts = [
    low > 0 ? `${String(low)} low` : '',
    edits > 0 ? `${String(edits)} edit${edits === 1 ? '' : 's'}` : '',
  ].filter((part) => part !== '')
  return parts.length > 0 ? parts.join(' / ') : null
}
