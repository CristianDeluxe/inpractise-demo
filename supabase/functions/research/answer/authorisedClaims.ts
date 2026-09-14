import type { Citation } from '../citations/Citation.ts'
import type { ProviderAnswer } from './ProviderAnswer.ts'

/** A claim is indivisible: every cited source must remain readable. */
export function authorisedClaims(
  answer: ProviderAnswer,
  citations: readonly Citation[],
  stillAuthorised: ReadonlySet<string>,
) {
  return answer.claims.flatMap((claim) => {
    const citationIds = claim.sources
      .map((source) => citations[source - 1]?.citationId)
      .filter((id): id is string => id !== undefined && stillAuthorised.has(id))
    return citationIds.length > 0 && citationIds.length === claim.sources.length
      ? [{ text: claim.text, citationIds }]
      : []
  })
}
