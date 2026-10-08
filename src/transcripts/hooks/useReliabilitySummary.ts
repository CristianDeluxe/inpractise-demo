import { useMemo } from 'react'
import type { CorrectionRun } from '../contracts/CorrectionRun'
import type { TranscriptDocument } from '../contracts/TranscriptDocument'
import { buildReliabilitySummary } from '../reliability/buildReliabilitySummary'
import type { DecisionMap } from '../review/DecisionMap'

/** Reliability of the AI-final text, recomputed whenever a person decides; null without a second pass. */
export function useReliabilitySummary(
  transcript: TranscriptDocument,
  correction: CorrectionRun | null,
  decisions: DecisionMap,
) {
  return useMemo(
    () =>
      correction === null
        ? null
        : buildReliabilitySummary(transcript, correction, decisions),
    [transcript, correction, decisions],
  )
}
