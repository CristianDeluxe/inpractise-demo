import { labTranscriptRowFixture } from '@/transcripts/fixtures/labTranscriptRowFixture'

export function costTablesFixture() {
  return {
    lab_transcripts: [labTranscriptRowFixture()],
    lab_reviews: [
      {
        transcript_id: 'synthetic-1',
        decisions: [
          {
            editId: 'e1',
            verdict: 'accepted',
            decidedAt: '2026-01-01T10:00:00Z',
          },
          {
            editId: 'e2',
            verdict: 'rejected',
            decidedAt: '2026-01-01T10:10:00Z',
          },
        ],
      },
    ],
    passages: [{ token_count: 10_000 }, { token_count: 17_145 }],
    'rpc:usage_summary': [
      {
        day: '2026-10-07',
        request_count: 7,
        input_tokens: 100_000,
        output_tokens: 20_000,
        tokens_total: 120_000,
      },
    ],
  }
}
