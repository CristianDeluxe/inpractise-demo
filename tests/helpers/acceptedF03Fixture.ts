import type { CaseResult } from '../../evals/CaseResult.ts'
import { caseResultFixture } from './caseResultFixture.ts'

/** The exact shape ADR 0005 accepts: F03 refusing because selection capped it. */
export function acceptedF03Fixture(): CaseResult {
  return caseResultFixture({
    caseId: 'F03',
    expectedStatus: 'answered',
    actualStatus: 'not_found',
    statusMatched: false,
    goldInContext: false,
    diagnosis: 'selection_miss',
  })
}
