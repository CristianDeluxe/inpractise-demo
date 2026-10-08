import type { TranscriptSource } from './TranscriptSource'
import type { TranscriptStats } from './TranscriptStats'

/** One row of the transcript list. */
export type TranscriptSummary = {
  readonly id: string
  readonly source: TranscriptSource
  readonly stats: TranscriptStats
  readonly hasCorrection: boolean
  /** Edits the correction run proposed; 0 without one. */
  readonly edits: number
  /** Saved accept or reject decisions. */
  readonly reviewed: number
}
