import { claimPrefixes } from './claimPrefixes.ts'
import type { CompareClaim } from './CompareClaim.ts'
import type { CompareRelation } from './CompareRelation.ts'
import type { Comparison } from './Comparison.ts'

/**
 * Positions become server-owned claim ids. A relation naming a claim that the
 * recheck dropped is dropped with it, and a repeated pairing is kept once.
 */
export function resolveRelations(
  relations: Comparison['relations'],
  interviews: readonly CompareClaim[],
  filings: readonly CompareClaim[],
): CompareRelation[] {
  const interviewIds = new Set(interviews.map((claim) => claim.claimId))
  const filingIds = new Set(filings.map((claim) => claim.claimId))
  const seen = new Set<string>()
  return relations.flatMap((relation) => {
    const interviewClaimId = `${claimPrefixes.interviews}${String(relation.interviewClaim)}`
    const filingClaimId = `${claimPrefixes.filings}${String(relation.filingClaim)}`
    const key = `${interviewClaimId}:${filingClaimId}`
    if (
      !interviewIds.has(interviewClaimId) ||
      !filingIds.has(filingClaimId) ||
      seen.has(key)
    )
      return []
    seen.add(key)
    return [{ interviewClaimId, filingClaimId, relation: relation.relation }]
  })
}
