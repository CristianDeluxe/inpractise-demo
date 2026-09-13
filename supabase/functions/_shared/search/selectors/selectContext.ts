import type { Candidate } from '../../types/Candidate.ts'

export function selectContext(candidates: readonly Candidate[]): Candidate[] {
  const selected: Candidate[] = []
  const counts = new Map<string, number>()
  let tokens = 0
  for (const candidate of candidates) {
    if (selected.length >= 8) break
    if (
      (counts.get(candidate.documentId) ?? 0) >= 2 ||
      tokens + candidate.tokenCount > 4000
    )
      continue
    selected.push(candidate)
    tokens += candidate.tokenCount
    counts.set(
      candidate.documentId,
      (counts.get(candidate.documentId) ?? 0) + 1,
    )
  }
  return selected
}
