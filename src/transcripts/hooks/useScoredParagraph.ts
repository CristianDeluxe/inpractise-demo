import { useMemo } from 'react'
import type { CorrectedParagraph } from '../contracts/CorrectedParagraph'
import type { TranscriptParagraph } from '../contracts/TranscriptParagraph'
import { scoreParagraph } from '../reliability/scoreParagraph'
import type { DecisionMap } from '../review/DecisionMap'

export function useScoredParagraph(
  paragraph: TranscriptParagraph,
  corrected: CorrectedParagraph | undefined,
  decisions: DecisionMap,
) {
  return useMemo(
    () => scoreParagraph(paragraph, corrected, decisions),
    [paragraph, corrected, decisions],
  )
}
