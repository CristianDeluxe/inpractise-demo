import { ApiError } from './ApiError.ts'
import { inspectResponseEvidence } from './inspectResponseEvidence.ts'
import type { ProviderAnswer } from './ProviderAnswer.ts'

/**
 * Reads core answer fields without assuming an undocumented flat or nested wire layout.
 * Use only after the required backend parser has strictly validated ProviderAnswer's
 * actual boundary and allowed AnswerSchema metadata. Projection here does not reject
 * additional provider fields and is not a replacement for that whole-response parser.
 */
export function extractProviderAnswer(data: unknown): ProviderAnswer {
  const { answers } = inspectResponseEvidence(data, true)
  const answer = answers[0]
  if (answers.length !== 1 || !answer)
    throw new ApiError(
      'protocol',
      'An ask response must contain exactly one structured answer.',
    )
  return answer
}
