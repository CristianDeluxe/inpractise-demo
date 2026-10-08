import type { DiffOp } from './DiffOp'
import { buildLcsTable } from './buildLcsTable'
import { isKeyMatch } from './isKeyMatch'
import { normalizeToken } from './normalizeToken'
import { prefersRemoval } from './prefersRemoval'

/** Interleaved word diff for short spans; matching ignores case and punctuation. */
export function diffOps(
  left: readonly string[],
  right: readonly string[],
): DiffOp[] {
  const leftKeys = left.map(normalizeToken)
  const rightKeys = right.map(normalizeToken)
  const table = buildLcsTable(leftKeys, rightKeys)
  const ops: DiffOp[] = []
  let i = 0
  let j = 0
  while (i < left.length || j < right.length) {
    if (isKeyMatch(leftKeys, rightKeys, i, j)) {
      ops.push({ kind: 'equal', text: right[j] ?? '' })
      i += 1
      j += 1
    } else if (prefersRemoval(table, i, j)) {
      ops.push({ kind: 'removed', text: left[i] ?? '' })
      i += 1
    } else {
      ops.push({ kind: 'added', text: right[j] ?? '' })
      j += 1
    }
  }
  return ops
}
