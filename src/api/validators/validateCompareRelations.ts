import { ApiError } from '../ApiError.ts'
import type { CompareRelationClaims } from './CompareRelationClaims.ts'
import type { CompareSides } from './CompareSides.ts'

/** A relation may only join a claim that exists on each side. */
export function validateCompareRelations(
  relations: readonly CompareRelationClaims[],
  sides: CompareSides,
): void {
  const interviewIds = new Set(
    sides.interviews.claims.map((claim) => claim.claimId),
  )
  const filingIds = new Set(sides.filings.claims.map((claim) => claim.claimId))
  for (const relation of relations)
    if (
      !interviewIds.has(relation.interviewClaimId) ||
      !filingIds.has(relation.filingClaimId)
    )
      throw new ApiError(
        'protocol',
        'A cross-reference relation names a claim that was not published.',
      )
}
