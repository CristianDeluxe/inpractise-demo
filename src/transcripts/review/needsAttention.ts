import type { CorrectedParagraph } from '../contracts/CorrectedParagraph'
import type { TranscriptParagraph } from '../contracts/TranscriptParagraph'
import { hasLowWord } from './hasLowWord'

/** A paragraph the reviewer must look at: low-confidence words or proposed edits. */
export function needsAttention(
  paragraph: TranscriptParagraph,
  corrected: CorrectedParagraph | undefined,
) {
  return hasLowWord(paragraph) || (corrected?.edits.length ?? 0) > 0
}
