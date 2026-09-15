import { ApiError } from '../../_shared/http/ApiError.ts'
import { parseModelJson } from './parseModelJson.ts'
import { RefinementSchema } from './RefinementSchema.ts'
import type { SubQuestion } from './SubQuestion.ts'

/**
 * The one reformulation the loop may run, or null when the model declined. A
 * reformulation of a sub-question that did have evidence, or of an index the
 * plan never had, is a model failure: refinement exists only for a miss.
 */
export function parseRefinement(
  content: string,
  empty: readonly SubQuestion[],
): SubQuestion | null {
  const refinement = parseModelJson(content, RefinementSchema, 'Refinement')
  if (refinement.index === null) return null
  const target = empty.find((entry) => entry.index === refinement.index)
  if (!target)
    throw new ApiError(
      'invalid_model_answer',
      'Refinement named a sub-question that did not need it',
    )
  const question = refinement.question.replace(/\s+/g, ' ').trim()
  if (!question)
    throw new ApiError('invalid_model_answer', 'Refinement was blank')
  return { ...target, question }
}
