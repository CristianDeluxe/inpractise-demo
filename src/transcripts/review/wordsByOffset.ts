import type { TranscriptWord } from '../contracts/TranscriptWord'

/** Each raw word keyed by where it starts in the space-joined text. */
export function wordsByOffset(
  words: readonly TranscriptWord[],
): Map<number, TranscriptWord> {
  const byOffset = new Map<number, TranscriptWord>()
  let offset = 0
  for (const word of words) {
    byOffset.set(offset, word)
    offset += word.text.length + 1
  }
  return byOffset
}
