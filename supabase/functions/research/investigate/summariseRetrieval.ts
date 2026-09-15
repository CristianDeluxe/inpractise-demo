import type { RetrievalSummary } from './RetrievalSummary.ts'
import type { SubQuestionEvidence } from './SubQuestionEvidence.ts'

/** The counts one retrieval step reports, with identifiers only when the
 * endpoint already discloses them to this principal. */
export function summariseRetrieval(
  evidence: SubQuestionEvidence,
  detailed: boolean,
): RetrievalSummary {
  return {
    mode: evidence.mode,
    candidateCount: evidence.candidates.length,
    selectedCount: evidence.selected.length,
    suppliedCount: evidence.sources.length,
    selectedTokens: evidence.selected.reduce(
      (total, candidate) => total + candidate.tokenCount,
      0,
    ),
    ...(detailed
      ? {
          candidateAt10: evidence.candidates
            .slice(0, 10)
            .map((candidate) => candidate.key),
          selectedIds: evidence.selected.map((candidate) => candidate.key),
        }
      : {}),
  }
}
