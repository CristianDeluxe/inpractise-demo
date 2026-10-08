import { bundleFixture } from '@/transcripts/fixtures/bundleFixture'
import type { CostRecord } from './CostRecord'

export function costRecordFixture(
  overrides: Partial<CostRecord> = {},
): CostRecord {
  const { transcript, correction } = bundleFixture()
  const { source } = transcript
  return {
    transcript_id: 'synthetic-1',
    source,
    asr_model: 'parakeet-tdt-0.6b-v3',
    asr_seconds: 4,
    correction_model: 'claude-sonnet-5',
    correction_input_tokens: 30_000,
    correction_output_tokens: 40_000,
    edit_count: 3,
    transcript,
    correction,
    ...overrides,
  }
}
