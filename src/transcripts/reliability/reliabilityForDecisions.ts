import type { CorrectionRun } from '../contracts/CorrectionRun'
import type { ReviewDecision } from '../contracts/ReviewDecision'
import type { TranscriptDocument } from '../contracts/TranscriptDocument'
import { toDecisionMap } from '../review/toDecisionMap'
import { buildReliabilitySummary } from './buildReliabilitySummary'
import type { ReliabilitySummary } from './ReliabilitySummary'

/** The reliability of an episode's AI-final text given its saved decisions; null while the AI pass has not run. */
export function reliabilityForDecisions(
  transcript: TranscriptDocument,
  correction: CorrectionRun | null,
  decisions: readonly ReviewDecision[],
): ReliabilitySummary | null {
  if (correction === null) return null
  return buildReliabilitySummary(
    transcript,
    correction,
    toDecisionMap(decisions),
  )
}
