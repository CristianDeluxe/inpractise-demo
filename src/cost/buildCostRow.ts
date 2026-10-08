import type { TranscriptBundle } from '@/transcripts/api/TranscriptBundle'
import type { TranscriptSummary } from '@/transcripts/contracts/TranscriptSummary'
import type { CostRow } from './CostRow'
import { estimateReviewerSeconds } from './estimateReviewerSeconds'
import { minutesPerAudioHour } from './minutesPerAudioHour'

export function buildCostRow(
  summary: TranscriptSummary,
  bundle: TranscriptBundle,
): CostRow {
  const audioSeconds = summary.source.durationSeconds
  const reviewerSeconds = estimateReviewerSeconds(
    bundle.review.map((decision) => decision.decidedAt),
  )
  return {
    id: summary.id,
    title: summary.source.title,
    audioSeconds,
    proposedEdits: summary.edits,
    decidedEdits: bundle.review.filter(
      (decision) => decision.verdict !== 'deferred',
    ).length,
    reviewerSeconds,
    minutesPerAudioHour:
      reviewerSeconds === undefined
        ? undefined
        : minutesPerAudioHour(reviewerSeconds, audioSeconds),
  }
}
