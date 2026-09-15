import type { Citation } from '../citations/Citation.ts'
import type { BuildCompareSideInput } from './BuildCompareSideInput.ts'
import type { CompareClaim } from './CompareClaim.ts'

/**
 * A claim is indivisible: every cited source must remain readable on the
 * recheck. Ids keep the model's positions, so a relation that named a dropped
 * claim can be recognised and dropped with it.
 */
export function authorisedCompareClaims(
  input: BuildCompareSideInput,
  citations: readonly Citation[],
): CompareClaim[] {
  return input.side.claims.flatMap((claim, index) => {
    const citationIds = claim.sources
      .map((label) => citations[label - input.offset - 1]?.citationId)
      .filter(
        (id): id is string => id !== undefined && input.stillAuthorised.has(id),
      )
    return citationIds.length === claim.sources.length
      ? [
          {
            claimId: `${input.prefix}${String(index + 1)}`,
            text: claim.text,
            quote: claim.quote,
            citationIds,
          },
        ]
      : []
  })
}
