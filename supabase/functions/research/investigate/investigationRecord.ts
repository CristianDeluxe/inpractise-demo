import type { MergedEvidence } from './MergedEvidence.ts'
import type { SubQuestionEvidence } from './SubQuestionEvidence.ts'

/**
 * The ledger record, in the exact shape a standalone ask writes: the reviewer
 * debug and provenance readers validate every stored record against that one
 * schema, so an investigation records its merged context there. The top ten
 * is the union of the steps' rankings in merge order; per-step detail travels
 * in the streamed trace and the response, not the ledger.
 */
export function investigationRecord(
  evidence: readonly SubQuestionEvidence[],
  merged: MergedEvidence,
) {
  const ranked: string[] = []
  const queues = evidence.map((entry) => [...entry.candidates])
  while (ranked.length < 10 && queues.some((queue) => queue.length))
    for (const queue of queues) {
      const candidate = queue.shift()
      if (candidate && ranked.length < 10 && !ranked.includes(candidate.key))
        ranked.push(candidate.key)
    }
  return {
    candidateAt10: ranked,
    selectedIds: merged.candidates.map((candidate) => candidate.key),
    selectedTokens: merged.candidates.reduce(
      (total, candidate) => total + candidate.tokenCount,
      0,
    ),
    revisionIds: [
      ...new Set(merged.candidates.map((candidate) => candidate.revisionId)),
    ].sort(),
  }
}
