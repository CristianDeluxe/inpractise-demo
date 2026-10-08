import type { Hunk } from './Hunk.ts'
import { hunkErrors } from './hunkErrors.ts'

/** Raw-against-final word error rate; the final transcript is the reference. */
export function wordErrorRate(
  hunks: readonly Hunk[],
  referenceWords: number,
): number {
  if (referenceWords === 0) return 0
  const errors = hunks.reduce((total, hunk) => total + hunkErrors(hunk), 0)
  return errors / referenceWords
}
