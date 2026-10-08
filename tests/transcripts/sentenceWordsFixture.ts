import type { MergedWord } from '../../scripts/transcripts/MergedWord.ts'
import { mergedWordFixture } from './mergedWordFixture.ts'

/** Words of one sentence spaced 0.1 s apart, starting at `start`. */
export function sentenceWordsFixture(
  count: number,
  start: number,
): MergedWord[] {
  return Array.from({ length: count }, (_unused, index) =>
    mergedWordFixture({
      text: `w${String(index)}`,
      start: start + index * 0.1,
      end: start + index * 0.1 + 0.05,
      sentenceStart: index === 0,
    }),
  )
}
