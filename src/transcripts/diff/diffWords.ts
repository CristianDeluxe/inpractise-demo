import type { WordDiff } from './WordDiff'
import { buildLcsTable } from './buildLcsTable'
import { lcsAt } from './lcsAt'
import { normalizeToken } from './normalizeToken'

/**
 * LCS word diff. Matching ignores case and punctuation; the caller keeps its
 * original tokens for rendering and uses the flags to decorate them.
 */
export function diffWords(
  raw: readonly string[],
  corrected: readonly string[],
): WordDiff {
  const left = raw.map(normalizeToken)
  const right = corrected.map(normalizeToken)
  const table = buildLcsTable(left, right)
  const rawChanged = left.map(() => true)
  const correctedChanged = right.map(() => true)
  let i = 0
  let j = 0
  while (i < left.length && j < right.length) {
    if (left[i] === right[j]) {
      rawChanged[i] = false
      correctedChanged[j] = false
      i += 1
      j += 1
    } else if (lcsAt(table, i + 1, j) >= lcsAt(table, i, j + 1)) {
      i += 1
    } else {
      j += 1
    }
  }
  return { rawChanged, correctedChanged }
}
