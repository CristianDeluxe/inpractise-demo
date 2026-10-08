import type { CorrectedParagraph } from '@/transcripts/contracts/CorrectedParagraph'
import type { TranscriptParagraph } from '@/transcripts/contracts/TranscriptParagraph'
import { composeText } from '@/transcripts/edits/composeText'
import { segmentParagraph } from '@/transcripts/edits/segmentParagraph'
import { wordOffsets } from '@/transcripts/edits/wordOffsets'
import type { DecisionMap } from '@/transcripts/review/DecisionMap'
import { paragraphRawText } from '@/transcripts/review/paragraphRawText'
import { appliesInFinal } from './appliesInFinal'
import { groupScoredWords } from './groupScoredWords'
import type { ScoredParagraph } from './ScoredParagraph'
import { scoreSegments } from './scoreSegments'

/** The AI-final words of one paragraph, each with its reliability; no correction leaves the ASR words. */
export function scoreParagraph(
  paragraph: TranscriptParagraph,
  corrected: CorrectedParagraph | undefined,
  decisions: DecisionMap,
): ScoredParagraph {
  const segments = segmentParagraph(
    paragraphRawText(paragraph),
    corrected?.edits ?? [],
  )
  const context = {
    paragraph,
    offsets: wordOffsets(paragraph.words.map((word) => word.text)),
    decisions,
  }
  const text = composeText(segments, appliesInFinal(decisions))
  return {
    id: paragraph.id,
    start: paragraph.start,
    words: groupScoredWords(paragraph, text, scoreSegments(context, segments)),
  }
}
