import type { CorrectionRun } from '@/transcripts/contracts/CorrectionRun'
import type { TranscriptDocument } from '@/transcripts/contracts/TranscriptDocument'
import type { TranscriptSource } from '@/transcripts/contracts/TranscriptSource'

/**
 * The cost columns of one lab_transcripts row, plus the two documents the
 * episode's reliability is computed from in the browser.
 */
export type CostRecord = {
  readonly transcript_id: string
  readonly source: TranscriptSource
  readonly asr_model: string
  readonly asr_seconds: number
  readonly correction_model: string | null
  readonly correction_input_tokens: number | null
  readonly correction_output_tokens: number | null
  readonly edit_count: number
  readonly transcript: TranscriptDocument
  readonly correction: CorrectionRun | null
}
