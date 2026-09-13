import type { Citation } from '../citations/Citation.ts'
import type { ProviderAnswer } from './ProviderAnswer.ts'

/**
 * A claim survives only with evidence the caller can still read. Dropping the
 * citation but keeping the prose would hand out a sentence whose source the
 * reader has just lost access to, which is the one thing this service promises
 * never to do.
 */
export function authorisedClaims(
  answer: ProviderAnswer,
  citations: readonly Citation[],
  stillAuthorised: ReadonlySet<string>,
) {
  return answer.claims
    .map((claim) => ({
      text: claim.text,
      citationIds: claim.sources
        .map((source) => citations[source - 1]?.citationId)
        .filter(
          (id): id is string => id !== undefined && stillAuthorised.has(id),
        ),
    }))
    .filter((claim) => claim.citationIds.length > 0)
}
