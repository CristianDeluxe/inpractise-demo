import type { WordFlag } from '@/transcripts/contracts/WordFlag.ts'
import { flagWords } from '../../scripts/transcripts/flagWords.ts'
import { mergedWordFixture } from './mergedWordFixture.ts'

/** Flags of each word; the first word starts a sentence unless told otherwise. */
export function flagsFixture(
  texts: readonly string[],
  confidence = 0.99,
  sentenceStart = true,
): WordFlag[][] {
  const words = texts.map((text, index) =>
    mergedWordFixture({
      text,
      confidence,
      sentenceStart: index === 0 && sentenceStart,
    }),
  )
  return flagWords(words, []).map((word) => [...word.flags])
}
