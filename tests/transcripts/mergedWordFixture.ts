import type { MergedWord } from '../../scripts/transcripts/MergedWord.ts'

export function mergedWordFixture(
  overrides: Partial<MergedWord> = {},
): MergedWord {
  return {
    text: 'word',
    start: 0,
    end: 0.5,
    confidence: 0.99,
    sentenceStart: false,
    ...overrides,
  }
}
