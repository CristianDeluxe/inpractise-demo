/** One lab_transcripts row exactly as the migration defines it. */
export type LabTranscriptRow = {
  readonly org_id: string
  readonly transcript_id: string
  readonly title: string
  readonly source: unknown
  readonly stats: unknown
  readonly duration_seconds: number
  readonly asr_model: string
  readonly asr_seconds: number
  readonly transcript: unknown
  readonly correction: unknown
  readonly correction_model: string | null
  readonly correction_input_tokens: number | null
  readonly correction_output_tokens: number | null
  readonly edit_count: number
  readonly peaks: unknown
  readonly audio_object: string
}
