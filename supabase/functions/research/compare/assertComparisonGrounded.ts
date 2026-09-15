import { ApiError } from '../../_shared/http/ApiError.ts'
import type { CitationSource } from '../citations/CitationSource.ts'
import { assertSideGrounded } from './assertSideGrounded.ts'
import type { Comparison } from './Comparison.ts'

/**
 * Both sides grounded in the passages they were shown, and every relation
 * naming a claim that exists on each side. Checked before the authorization
 * recheck: an ungrounded reply is a model failure whatever the reader may see.
 */
export function assertComparisonGrounded(
  comparison: Comparison,
  interviews: readonly CitationSource[],
  filings: readonly CitationSource[],
): void {
  assertSideGrounded(comparison.interviews, interviews, 0)
  assertSideGrounded(comparison.filings, filings, interviews.length)
  for (const relation of comparison.relations)
    if (
      relation.interviewClaim > comparison.interviews.claims.length ||
      relation.filingClaim > comparison.filings.claims.length
    )
      throw new ApiError(
        'invalid_model_answer',
        'Relation named a claim that was not made',
      )
}
