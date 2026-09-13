import type { CaseResult } from './CaseResult.ts'

/** The four numbers the demo is allowed to claim, each counted from cases. */
export function summariseResults(results: readonly CaseResult[]) {
  const evidenceCases = results.filter(
    (item) => item.expectedStatus !== 'not_found',
  )
  const refusalCases = results.filter(
    (item) => item.expectedStatus === 'not_found',
  )
  return {
    cases: results.length,
    statusMatched: results.filter((item) => item.statusMatched).length,
    candidateRecallAt10: {
      hit: evidenceCases.filter((item) => item.goldRecallAt10).length,
      of: evidenceCases.length,
    },
    correctRefusals: {
      hit: refusalCases.filter((item) => item.statusMatched).length,
      of: refusalCases.length,
    },
    grounded: results.filter((item) => item.verdict.grounded).length,
    unauthorisedCitations: results.filter(
      (item) => !item.citationsAllAuthorised,
    ).length,
    leaks: results.flatMap((item) =>
      item.forbiddenStringsLeaked.length ? [item.caseId] : [],
    ),
    retrievalMisses: results.flatMap((item) =>
      item.diagnosis === 'retrieval_miss' ? [item.caseId] : [],
    ),
    selectionMisses: results.flatMap((item) =>
      item.diagnosis === 'selection_miss' ? [item.caseId] : [],
    ),
  }
}
