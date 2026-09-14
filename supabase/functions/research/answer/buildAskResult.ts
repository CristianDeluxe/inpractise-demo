import { buildCitation } from '../citations/buildCitation.ts'
import type { Citation } from '../citations/Citation.ts'
import type { CitationSource } from '../citations/CitationSource.ts'
import { authorisedClaims } from './authorisedClaims.ts'
import type { ProviderAnswer } from './ProviderAnswer.ts'

/**
 * Maps the model's numeric source labels back onto citations, dropping every
 * claim whose evidence the caller may no longer read. An answer that loses all
 * of its evidence mid-request becomes a refusal rather than unsourced prose.
 */
export function buildAskResult(
  answer: ProviderAnswer,
  sources: readonly CitationSource[],
  stillAuthorised: ReadonlySet<string>,
) {
  const citations: Citation[] = sources.map(buildCitation)
  const claims = authorisedClaims(answer, citations, stillAuthorised)
  const cited = new Set(claims.flatMap((claim) => claim.citationIds))
  if (!claims.length)
    return {
      status: 'not_found' as const,
      claims: [],
      missingEvidence: answer.claims.length
        ? ['Access to the supporting evidence changed.']
        : answer.missingEvidence,
      citations: [],
    }
  return {
    status: answer.status,
    claims,
    missingEvidence: answer.missingEvidence,
    citations: citations.filter((citation) => cited.has(citation.citationId)),
  }
}
