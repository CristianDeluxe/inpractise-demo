import type { TranscriptSource } from '../contracts/TranscriptSource'
import type { TranscriptStats } from '../contracts/TranscriptStats'

/** The small columns of lab_transcripts; the heavy documents are not selected. */
export type TranscriptListRow = {
  readonly transcript_id: string
  readonly source: TranscriptSource
  readonly stats: TranscriptStats
  readonly correction_model: string | null
  readonly edit_count: number
}
