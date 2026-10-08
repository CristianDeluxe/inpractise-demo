import { useMemo } from 'react'
import type { CorrectedParagraph } from '../contracts/CorrectedParagraph'
import { segmentCorrectedText } from '../review/segmentCorrectedText'

export function useSegments(corrected: CorrectedParagraph) {
  return useMemo(
    () => segmentCorrectedText(corrected.text, corrected.edits),
    [corrected],
  )
}
