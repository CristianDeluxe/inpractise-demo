import type { Candidate } from '../../_shared/types/Candidate.ts'

/**
 * The record that lets a reviewer tell retrieval loss from selection loss on a
 * real question: what ranked into the top ten before context selection, what
 * selection actually sent to the model, and the token budget that decision
 * spent. Revision ids are the server-owned corpus identity available at answer
 * time; nothing here is derived from the model's output.
 */
export function retrievalDiagnostics(
  candidates: readonly Candidate[],
  selected: readonly Candidate[],
) {
  return {
    candidateAt10: candidates.slice(0, 10).map((candidate) => candidate.key),
    selectedIds: selected.map((candidate) => candidate.key),
    selectedTokens: selected.reduce(
      (total, candidate) => total + candidate.tokenCount,
      0,
    ),
    revisionIds: [
      ...new Set(selected.map((candidate) => candidate.revisionId)),
    ].sort(),
  }
}
