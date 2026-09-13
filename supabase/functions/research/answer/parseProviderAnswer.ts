import { ApiError } from '../../_shared/http/ApiError.ts'
import type { ProviderAnswer } from './ProviderAnswer.ts'
import { ProviderAnswerSchema } from './ProviderAnswerSchema.ts'

/** A malformed answer is a model failure, never a refusal shown to the reader. */
export function parseProviderAnswer(content: string): ProviderAnswer {
  let parsed: unknown
  try {
    parsed = JSON.parse(content)
  } catch {
    throw new ApiError('invalid_model_answer', 'Answer was not JSON')
  }
  const answer = ProviderAnswerSchema.safeParse(parsed)
  if (!answer.success)
    throw new ApiError(
      'invalid_model_answer',
      `Answer failed its schema: ${answer.error.issues
        .map((issue) => `${issue.path.join('.') || 'root'}/${issue.code}`)
        .slice(0, 4)
        .join(', ')}`,
    )
  return answer.data
}
