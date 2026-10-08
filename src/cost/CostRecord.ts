import type { TranscriptSource } from '@/transcripts/contracts/TranscriptSource'

/** The cost columns of one lab_transcripts row. */
export type CostRecord = {
  readonly transcript_id: string
  readonly source: TranscriptSource
  readonly asr_model: string
  readonly asr_seconds: number
  readonly correction_model: string | null
  readonly correction_input_tokens: number | null
  readonly correction_output_tokens: number | null
  readonly edit_count: number
}
