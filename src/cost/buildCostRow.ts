import type { ReviewDecision } from '@/transcripts/contracts/ReviewDecision'
import type { CostRecord } from './CostRecord'
import type { CostRow } from './CostRow'
import { estimateReviewerSeconds } from './estimateReviewerSeconds'
import { minutesPerAudioHour } from './minutesPerAudioHour'
import { findPrice } from './prices/findPrice'
import { tokenCostUsd } from './prices/tokenCostUsd'

export function buildCostRow(
  record: CostRecord,
  decisions: readonly ReviewDecision[],
): CostRow {
  const audioSeconds = record.source.durationSeconds
  const reviewerSeconds = estimateReviewerSeconds(
    decisions.map((decision) => decision.decidedAt),
  )
  const hasTokens =
    record.correction_input_tokens !== null &&
    record.correction_output_tokens !== null
  return {
    id: record.transcript_id,
    title: record.source.title,
    audioSeconds,
    asrModel: record.asr_model,
    asrSeconds: record.asr_seconds,
    correctionModel: record.correction_model,
    inputTokens: record.correction_input_tokens,
    outputTokens: record.correction_output_tokens,
    aiCostUsd: hasTokens
      ? tokenCostUsd(
          findPrice(record.correction_model),
          record.correction_input_tokens,
          record.correction_output_tokens,
        )
      : undefined,
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
