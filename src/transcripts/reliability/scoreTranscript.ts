import type { CorrectionRun } from '@/transcripts/contracts/CorrectionRun'
import type { TranscriptDocument } from '@/transcripts/contracts/TranscriptDocument'
import { correctedParagraphMap } from '@/transcripts/review/correctedParagraphMap'
import type { DecisionMap } from '@/transcripts/review/DecisionMap'
import type { ScoredParagraph } from './ScoredParagraph'
import { scoreParagraph } from './scoreParagraph'

export function scoreTranscript(
  transcript: TranscriptDocument,
  correction: CorrectionRun | null,
  decisions: DecisionMap,
): ScoredParagraph[] {
  const corrected = correctedParagraphMap(correction)
  return transcript.paragraphs.map((paragraph) =>
    scoreParagraph(paragraph, corrected.get(paragraph.id), decisions),
  )
}
