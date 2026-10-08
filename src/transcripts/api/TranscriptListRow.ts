import type { CorrectionRun } from '../contracts/CorrectionRun'
import type { TranscriptDocument } from '../contracts/TranscriptDocument'
import type { TranscriptSource } from '../contracts/TranscriptSource'
import type { TranscriptStats } from '../contracts/TranscriptStats'

/**
 * The columns of lab_transcripts the list reads. The two documents are heavy,
 * but reliability is computed from them in the browser rather than stored, so
 * the list needs them; there is no separate summary column to keep in step.
 */
export type TranscriptListRow = {
  readonly transcript_id: string
  readonly source: TranscriptSource
  readonly stats: TranscriptStats
  readonly correction_model: string | null
  readonly edit_count: number
  readonly transcript: TranscriptDocument
  readonly correction: CorrectionRun | null
}
