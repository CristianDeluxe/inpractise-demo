import type { ReviewDecision } from '@/transcripts/contracts/ReviewDecision'
import { displayTitle } from '@/transcripts/episodes/displayTitle'
import { reliabilityForDecisions } from '@/transcripts/reliability/reliabilityForDecisions'
import type { CostRecord } from './CostRecord'
import type { CostRow } from './CostRow'
import { estimateReviewerSeconds } from './estimateReviewerSeconds'
import { minutesPerAudioHour } from './minutesPerAudioHour'

export function buildCostRow(
  record: CostRecord,
  decisions: readonly ReviewDecision[],
): CostRow {
  const audioSeconds = record.source.durationSeconds
  const reviewerSeconds = estimateReviewerSeconds(
    decisions.map((decision) => decision.decidedAt),
  )
  return {
    id: record.transcript_id,
    title: displayTitle(record.transcript_id, record.source.title),
    audioSeconds,
    asrModel: record.asr_model,
    asrSeconds: record.asr_seconds,
    correctionModel: record.correction_model,
    inputTokens: record.correction_input_tokens,
    outputTokens: record.correction_output_tokens,
    reliability: reliabilityForDecisions(
      record.transcript,
      record.correction,
      decisions,
    ),
    proposedEdits: record.edit_count,
    decidedEdits: decisions.filter(
      (decision) => decision.verdict !== 'deferred',
    ).length,
    reviewerSeconds,
    minutesPerAudioHour:
      reviewerSeconds === undefined
        ? undefined
        : minutesPerAudioHour(reviewerSeconds, audioSeconds),
  }
}
