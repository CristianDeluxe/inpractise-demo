import type { TokenOffset } from './TokenOffset'

/** Index of the first token at or after `from` where `keys` appear consecutively, or -1. */
export function findKeySequence(
  tokens: readonly TokenOffset[],
  keys: readonly string[],
  from: number,
) {
  if (keys.length === 0) return -1
  for (let start = from; start + keys.length <= tokens.length; start += 1) {
    if (keys.every((key, offset) => tokens[start + offset]?.key === key)) {
      return start
    }
  }
  return -1
}
