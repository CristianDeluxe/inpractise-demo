import type { CorrectionRun } from '@/transcripts/contracts/CorrectionRun'
import type { TranscriptDocument } from '@/transcripts/contracts/TranscriptDocument'
import type { DecisionMap } from '@/transcripts/review/DecisionMap'
import { countEditStatuses } from './countEditStatuses'
import { isReliableWord } from './isReliableWord'
import type { ReliabilitySummary } from './ReliabilitySummary'
import { scoreTranscript } from './scoreTranscript'

export function buildReliabilitySummary(
  transcript: TranscriptDocument,
  correction: CorrectionRun | null,
  decisions: DecisionMap,
): ReliabilitySummary {
  const words = scoreTranscript(transcript, correction, decisions).flatMap(
    (paragraph) => paragraph.words,
  )
  const reliableWords = words.filter(isReliableWord).length
  return {
    words: words.length,
    reliableWords,
    spotCheckWords: words.length - reliableWords,
    reliability: words.length === 0 ? 0 : reliableWords / words.length,
    edits: countEditStatuses(transcript, correction, decisions),
  }
}
