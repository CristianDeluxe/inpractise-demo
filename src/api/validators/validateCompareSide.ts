import type { CompareSide } from '@/contracts/CompareSide'
import { ApiError } from '../ApiError.ts'
import { quoteOccursIn } from './quoteOccursIn.ts'

/**
 * Every claim on a side cites that side's own citations, and its quotation
 * occurs in one of them. A refusal carries no claims; any other status carries
 * at least one. Shape validation cannot prove any of this, so it is checked
 * before a side can render.
 */
export function validateCompareSide(side: CompareSide): void {
  const byId = new Map(
    side.citations.map((citation) => [citation.citationId, citation]),
  )
  for (const claim of side.claims) {
    const cited = claim.citationIds.flatMap((id) => {
      const citation = byId.get(id)
      return citation ? [citation] : []
    })
    if (!claim.text.trim() || cited.length !== claim.citationIds.length)
      throw new ApiError(
        'protocol',
        'A cross-reference claim cites evidence outside its side.',
      )
    if (!cited.some((citation) => quoteOccursIn(claim.quote, citation.quote)))
      throw new ApiError(
        'protocol',
        'A cross-reference quotation does not occur in its cited passage.',
      )
  }
  if (
    side.status === 'not_found' ? side.claims.length > 0 : !side.claims.length
  )
    throw new ApiError(
      'protocol',
      'A cross-reference side contradicts its own status.',
    )
}
