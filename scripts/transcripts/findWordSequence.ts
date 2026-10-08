import type { WordSpan } from './WordSpan.ts'

/** Index of the first word where `keys` appear consecutively in `spans`, or -1. */
export function findWordSequence(
  spans: readonly WordSpan[],
  keys: readonly string[],
): number {
  if (keys.length === 0) return -1
  for (let start = 0; start + keys.length <= spans.length; start += 1) {
    if (keys.every((key, offset) => spans[start + offset]?.key === key)) {
      return start
    }
  }
  return -1
}
