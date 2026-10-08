import { useMemo } from 'react'
import type { CorrectedParagraph } from '../contracts/CorrectedParagraph'
import type { TranscriptParagraph } from '../contracts/TranscriptParagraph'
import type { DecisionMap } from '../review/DecisionMap'
import { struckWords } from '../review/struckWords'

/** Which raw words the corrected column replaces, after the reviewer's rejections. */
export function useParagraphDiff(
  paragraph: TranscriptParagraph,
  corrected: CorrectedParagraph,
  decisions: DecisionMap,
) {
  return useMemo(
    () => struckWords(paragraph, corrected.edits, decisions),
    [paragraph, corrected, decisions],
  )
}
