import { useMemo } from 'react'
import type { CorrectedParagraph } from '../contracts/CorrectedParagraph'
import type { TranscriptParagraph } from '../contracts/TranscriptParagraph'
import { segmentParagraph } from '../edits/segmentParagraph'
import { sliceAtBreaks } from '../edits/sliceAtBreaks'
import { speakerBreaks } from '../edits/speakerBreaks'
import { paragraphRawText } from '../review/paragraphRawText'
import { useSpeakerLabels } from './useSpeakerLabels'

/** The paragraph cut at each change of speaker: raw words and edit segments per turn. */
export function useParagraphTurns(
  paragraph: TranscriptParagraph,
  corrected: CorrectedParagraph | undefined,
) {
  const labels = useSpeakerLabels()
  return useMemo(() => {
    const segments = segmentParagraph(
      paragraphRawText(paragraph),
      corrected?.edits ?? [],
    )
    return sliceAtBreaks(
      segments,
      paragraph.words,
      speakerBreaks(labels, paragraph.words),
    )
  }, [paragraph, corrected, labels])
}
