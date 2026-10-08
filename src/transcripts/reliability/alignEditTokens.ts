import { diffOps } from '@/transcripts/diff/diffOps'
import type { AlignedToken } from './AlignedToken'
import type { TextToken } from './TextToken'

/** Which words of an edit's `from` and `to` are the same word (ignoring case and punctuation) and which really changed. */
export function alignEditTokens(
  from: readonly TextToken[],
  to: readonly TextToken[],
): AlignedToken[] {
  let left = 0
  return diffOps(
    from.map((token) => token.text),
    to.map((token) => token.text),
  ).map((op) => {
    if (op.kind === 'added') return { ...op, leftIndex: null }
    left += 1
    return { ...op, leftIndex: left - 1 }
  })
}
