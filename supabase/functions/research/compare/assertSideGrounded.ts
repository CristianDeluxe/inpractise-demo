import { ApiError } from '../../_shared/http/ApiError.ts'
import type { CitationSource } from '../citations/CitationSource.ts'
import type { ComparisonSide } from './ComparisonSide.ts'
import { quoteOccursIn } from './quoteOccursIn.ts'

/**
 * A side may only cite its own passages, and every quotation must occur in a
 * passage the claim cites. A refusal carrying claims, or a verdict carrying
 * none, invalidates the reply, as it does for an answer.
 */
export function assertSideGrounded(
  side: ComparisonSide,
  sources: readonly CitationSource[],
  offset: number,
): void {
  for (const claim of side.claims) {
    const cited = claim.sources.map((label) => {
      const source = sources[label - offset - 1]
      if (label <= offset || !source)
        throw new ApiError(
          'invalid_model_answer',
          'Claim cited a passage outside its side',
        )
      return source
    })
    if (!cited.some((source) => quoteOccursIn(claim.quote, source.text)))
      throw new ApiError(
        'invalid_model_answer',
        'Quotation does not occur in the cited passage',
      )
  }
  if (side.status === 'not_found' && side.claims.length)
    throw new ApiError('invalid_model_answer', 'not_found carried claims')
  if (side.status !== 'not_found' && !side.claims.length)
    throw new ApiError('invalid_model_answer', 'Side carried no claims')
}
