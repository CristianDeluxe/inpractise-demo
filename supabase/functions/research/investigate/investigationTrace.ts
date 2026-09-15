import type { SubQuestionEvidence } from './SubQuestionEvidence.ts'
import { summariseRetrieval } from './summariseRetrieval.ts'

/**
 * The per-step record an unrestricted reviewer gets with the answer: what each
 * retrieval ranked and kept, keyed by the sub-question it ran for. Identifiers
 * are the same `document:revision:passage` keys the server ranks on.
 */
export function investigationTrace(evidence: readonly SubQuestionEvidence[]) {
  return {
    steps: evidence.map((entry) => {
      const summary = summariseRetrieval(entry, true)
      return {
        step: entry.subQuestion.index,
        candidateAt10: summary.candidateAt10 ?? [],
        selectedIds: summary.selectedIds ?? [],
        selectedTokens: summary.selectedTokens,
      }
    }),
  }
}
