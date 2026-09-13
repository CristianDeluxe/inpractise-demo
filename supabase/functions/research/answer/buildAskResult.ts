import { buildCitation } from '../citations/buildCitation.ts'
import type { Citation } from '../citations/Citation.ts'
import type { CitationSource } from '../citations/CitationSource.ts'
import type { ProviderAnswer } from './ProviderAnswer.ts'

/**
 * Maps the model's numeric source labels back onto citations, dropping every
 * claim reference whose evidence the caller may no longer read.
 */
export function buildAskResult(
  answer: ProviderAnswer,
  sources: readonly CitationSource[],
  stillAuthorised: ReadonlySet<string>,
) {
  const citations: Citation[] = sources.map(buildCitation)
  const cited = new Set(answer.claims.flatMap((claim) => claim.sources))
  return {
    status: answer.status,
    claims: answer.claims.map((claim) => ({
      text: claim.text,
      citationIds: claim.sources
        .map((source) => citations[source - 1]?.citationId)
        .filter(
          (id): id is string => id !== undefined && stillAuthorised.has(id),
        ),
    })),
    missingEvidence: answer.missingEvidence,
    citations: citations.filter(
      (citation, index) =>
        cited.has(index + 1) && stillAuthorised.has(citation.citationId),
    ),
  }
}
