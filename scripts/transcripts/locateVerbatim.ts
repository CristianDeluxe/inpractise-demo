import { findWordSequence } from './findWordSequence.ts'
import { stripUncertaintyMarkup } from './stripUncertaintyMarkup.ts'
import { wordSpans } from './wordSpans.ts'

/**
 * Returns the exact substring of `haystack` the model meant by `from`: verbatim
 * after removing prompt markup, otherwise the same word sequence ignoring case
 * and punctuation. Trailing punctuation is kept only when `from` had it.
 */
export function locateVerbatim(
  haystack: string,
  from: string,
): string | undefined {
  const cleaned = stripUncertaintyMarkup(from).trim()
  if (cleaned === '') return undefined
  if (haystack.includes(cleaned)) return cleaned
  const keys = wordSpans(cleaned).map((span) => span.key)
  const spans = wordSpans(haystack)
  const first = findWordSequence(spans, keys)
  if (first === -1) return undefined
  const start = spans[first]?.start ?? 0
  const lastSpan = spans[first + keys.length - 1]
  const end = lastSpan?.end ?? start
  const span = haystack.slice(start, end)
  const keepsPunctuation = /[^\p{L}\p{N}]$/u.test(cleaned)
  return keepsPunctuation ? span : span.replace(/[^\p{L}\p{N}]+$/u, '')
}
