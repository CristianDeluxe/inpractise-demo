import type { CaseResult } from '../../evals/CaseResult.ts'

export function caseResultFixture(
  overrides: Partial<CaseResult> = {},
): CaseResult {
  return {
    caseId: 'G01',
    persona: 'basic',
    expectedStatus: 'answered',
    actualStatus: 'answered',
    statusMatched: true,
    goldRecallAt10: true,
    goldInContext: true,
    diagnosis: 'pass',
    citationsAllAuthorised: true,
    forbiddenStringsLeaked: [],
    candidateCount: 12,
    verdict: { grounded: true, statusAppropriate: true, reason: 'supported' },
    ...overrides,
  }
}
