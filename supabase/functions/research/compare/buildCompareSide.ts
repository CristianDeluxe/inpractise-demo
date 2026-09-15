import { buildCitation } from '../citations/buildCitation.ts'
import { authorisedCompareClaims } from './authorisedCompareClaims.ts'
import type { BuildCompareSideInput } from './BuildCompareSideInput.ts'
import type { CompareSide } from './CompareSide.ts'

/**
 * Maps one side's numeric labels back onto citations, dropping every claim
 * whose evidence the caller may no longer read. A side that loses all of its
 * evidence mid-request becomes a refusal rather than unsourced prose.
 */
export function buildCompareSide(input: BuildCompareSideInput): CompareSide {
  const citations = input.sources.map(buildCitation)
  const claims = authorisedCompareClaims(input, citations)
  const cited = new Set(claims.flatMap((claim) => claim.citationIds))
  if (!claims.length)
    return {
      status: 'not_found',
      claims: [],
      missingEvidence: input.side.claims.length
        ? ['Access to the supporting evidence changed.']
        : input.side.missingEvidence,
      citations: [],
      candidateCount: input.candidateCount,
    }
  return {
    status: input.side.status,
    claims,
    missingEvidence: input.side.missingEvidence,
    citations: citations.filter((citation) => cited.has(citation.citationId)),
    candidateCount: input.candidateCount,
  }
}
