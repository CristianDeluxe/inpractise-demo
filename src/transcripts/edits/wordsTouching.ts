import type { CharRange } from './CharRange'
import { wordOffsets } from './wordOffsets'

/** For each word, whether any of the character ranges overlaps it. */
export function wordsTouching(
  words: readonly string[],
  ranges: readonly CharRange[],
): boolean[] {
  const offsets = wordOffsets(words)
  return words.map((word, index) => {
    const start = offsets[index] ?? 0
    const end = start + word.length
    return ranges.some((range) => start < range.end && end > range.start)
  })
}
