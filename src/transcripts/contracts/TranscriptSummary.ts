import type { TranscriptSource } from './TranscriptSource'
import type { TranscriptStats } from './TranscriptStats'

/** One row of the transcript list. */
export type TranscriptSummary = {
  readonly id: string
  readonly source: TranscriptSource
  readonly stats: TranscriptStats
  readonly hasCorrection: boolean
  readonly reviewed: number
}
