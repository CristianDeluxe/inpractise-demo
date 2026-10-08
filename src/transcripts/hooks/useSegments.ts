import { useMemo } from 'react'
import type { CorrectedParagraph } from '../contracts/CorrectedParagraph'
import type { TranscriptParagraph } from '../contracts/TranscriptParagraph'
import { segmentParagraph } from '../edits/segmentParagraph'
import { paragraphRawText } from '../review/paragraphRawText'

/** The raw paragraph cut at each placed edit; the marks render from the edits themselves. */
export function useSegments(
  paragraph: TranscriptParagraph,
  corrected: CorrectedParagraph,
) {
  return useMemo(
    () => segmentParagraph(paragraphRawText(paragraph), corrected.edits),
    [paragraph, corrected],
  )
}
