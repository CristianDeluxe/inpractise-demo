import type { ReliabilitySummary } from '@/transcripts/reliability/ReliabilitySummary'

/** What one transcript cost to clean, from what the lab recorded. */
export type CostRow = {
  readonly id: string
  readonly title: string
  readonly audioSeconds: number
  /** Local speech recognition; no API is called, so its API cost is zero. */
  readonly asrModel: string
  readonly asrSeconds: number
  /** Null until the second AI pass has run. The pass runs on a subscription lane: no per-token charge. */
  readonly correctionModel: string | null
  readonly inputTokens: number | null
  readonly outputTokens: number | null
  /** Reliability of the AI-final text; null until the AI pass has run. */
  readonly reliability: ReliabilitySummary | null
  readonly proposedEdits: number
  readonly decidedEdits: number
  /** Optional spot-check time; undefined when the decision timestamps cannot measure it. */
  readonly reviewerSeconds: number | undefined
  readonly minutesPerAudioHour: number | undefined
}
