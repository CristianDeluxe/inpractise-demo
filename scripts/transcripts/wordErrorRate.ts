import type { Hunk } from './Hunk.ts'
import { hunkErrors } from './hunkErrors.ts'

/**
 * Raw-against-final word error rate; the final transcript is the reference.
 * An empty reference has no rate, so any error there counts as 100%.
 */
export function wordErrorRate(
  hunks: readonly Hunk[],
  referenceWords: number,
): number {
  const errors = hunks.reduce((total, hunk) => total + hunkErrors(hunk), 0)
  if (referenceWords === 0) return errors === 0 ? 0 : 1
  return errors / referenceWords
}
