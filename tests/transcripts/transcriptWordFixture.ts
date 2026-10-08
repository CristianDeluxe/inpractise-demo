import type { TranscriptWord } from '@/transcripts/contracts/TranscriptWord.ts'

export function transcriptWordFixture(
  text: string,
  overrides: Partial<TranscriptWord> = {},
): TranscriptWord {
  return {
    text,
    start: 0,
    end: 0.5,
    confidence: 0.99,
    band: 'high',
    flags: [],
    ...overrides,
  }
}
