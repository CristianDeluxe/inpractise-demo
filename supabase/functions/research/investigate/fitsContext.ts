import type { Candidate } from '../../_shared/types/Candidate.ts'

/** The standalone-ask context caps, applied to one more candidate: at most
 * eight passages, 4000 tokens, and no passage twice. */
export function fitsContext(
  candidate: Candidate,
  kept: readonly Candidate[],
  tokens: number,
): boolean {
  return (
    kept.length < 8 &&
    tokens + candidate.tokenCount <= 4000 &&
    !kept.some((entry) => entry.key === candidate.key)
  )
}
