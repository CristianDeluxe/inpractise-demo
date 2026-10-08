/** Counts over the whole transcript, used by the review header and the report. */
export type TranscriptStats = {
  readonly words: number
  readonly high: number
  readonly medium: number
  readonly low: number
  readonly flagged: number
}
