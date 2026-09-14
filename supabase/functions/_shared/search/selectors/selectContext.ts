import type { Candidate } from '../../types/Candidate.ts'

/**
 * Consume candidates in rank order under independent passage, token and document
 * caps. Skip an over-budget candidate rather than ending selection, since a later
 * one may still fit. The per-document cap remains in force for company searches.
 */
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
