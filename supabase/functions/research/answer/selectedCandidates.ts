import type { Candidate } from '../../_shared/types/Candidate.ts'

/** The retrieved candidates that context selection kept, in rank order. */
export function selectedCandidates(
  candidates: readonly Candidate[],
  selectedIds: readonly string[],
): Candidate[] {
  return candidates.filter((candidate) => selectedIds.includes(candidate.key))
}
