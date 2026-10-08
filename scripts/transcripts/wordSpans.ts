import { matchKey } from './matchKey.ts'
import type { WordSpan } from './WordSpan.ts'

/** Splits text into words with offsets, dropping tokens that are pure punctuation. */
export function wordSpans(text: string): WordSpan[] {
  return [...text.matchAll(/\S+/g)]
    .map((match) => ({
      key: matchKey(match[0]),
      start: match.index,
      end: match.index + match[0].length,
    }))
    .filter((span) => span.key !== '')
}
