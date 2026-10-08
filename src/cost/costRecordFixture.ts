import { transcriptFixture } from '@/transcripts/fixtures/transcriptFixture'
import type { CostRecord } from './CostRecord'

export function costRecordFixture(
  overrides: Partial<CostRecord> = {},
): CostRecord {
  const { source } = transcriptFixture()
  return {
    transcript_id: 'synthetic-1',
    source,
    asr_model: 'parakeet-tdt-0.6b-v3',
    asr_seconds: 4,
    correction_model: 'claude-sonnet-5',
    correction_input_tokens: 30_000,
    correction_output_tokens: 40_000,
    edit_count: 3,
    ...overrides,
  }
}
