import { ApiError } from '../../_shared/http/ApiError.ts'
import { maxSubQuestions } from './maxSubQuestions.ts'
import { parseModelJson } from './parseModelJson.ts'
import { PlanSchema } from './PlanSchema.ts'
import type { SubQuestion } from './SubQuestion.ts'

/**
 * The plan the loop will run: at most four sub-questions, each scoped only to
 * a company the caller may list. A slug outside that list is a model failure,
 * not a scope silently widened or dropped. When the request itself is scoped
 * to one company, every sub-question inherits that scope.
 */
export function parsePlan(
  content: string,
  allowedCompanies: readonly string[],
  requestCompany: string | undefined,
): SubQuestion[] {
  const plan = parseModelJson(content, PlanSchema, 'Plan')
  return plan.subQuestions
    .slice(0, maxSubQuestions)
    .map((entry, position): SubQuestion => {
      const company = entry.company ?? undefined
      if (company !== undefined && !allowedCompanies.includes(company))
        throw new ApiError(
          'invalid_model_answer',
          'Plan scoped a sub-question to a company outside the corpus',
        )
      const question = entry.question.replace(/\s+/g, ' ').trim()
      if (!question)
        throw new ApiError('invalid_model_answer', 'Plan carried a blank line')
      const scope = requestCompany ?? company
      return {
        index: position + 1,
        question,
        ...(scope === undefined ? {} : { company: scope }),
      }
    })
}
