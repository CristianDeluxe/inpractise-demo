import type { CompareSide } from '@/contracts/CompareSide'
import { ApiError } from '../ApiError.ts'

/** A relation may only join a claim that exists on each side. */
export function validateCompareRelations(
  relations: readonly { interviewClaimId: string; filingClaimId: string }[],
  sides: { interviews: CompareSide; filings: CompareSide },
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
