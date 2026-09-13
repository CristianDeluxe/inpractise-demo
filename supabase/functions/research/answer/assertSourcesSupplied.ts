import { ApiError } from '../../_shared/http/ApiError.ts'
import type { ProviderAnswer } from './ProviderAnswer.ts'

/**
 * The model may only cite passages it was shown. An out-of-range number, a
 * refusal carrying claims, or an answer carrying none, invalidates the reply.
 */
export function assertSourcesSupplied(
  answer: ProviderAnswer,
  suppliedCount: number,
): void {
  for (const claim of answer.claims)
    for (const source of claim.sources)
      if (source > suppliedCount)
        throw new ApiError(
          'invalid_model_answer',
          'Answer cited a passage that was not supplied',
        )
  if (answer.status === 'not_found' && answer.claims.length)
    throw new ApiError('invalid_model_answer', 'not_found carried claims')
  if (answer.status !== 'not_found' && !answer.claims.length)
    throw new ApiError('invalid_model_answer', 'Answer carried no claims')
}
