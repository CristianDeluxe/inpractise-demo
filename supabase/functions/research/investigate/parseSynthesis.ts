import { ApiError } from '../../_shared/http/ApiError.ts'
import { assertSourcesSupplied } from '../answer/assertSourcesSupplied.ts'
import { parseModelJson } from './parseModelJson.ts'
import type { SubQuestion } from './SubQuestion.ts'
import type { Synthesis } from './Synthesis.ts'
import { SynthesisSchema } from './SynthesisSchema.ts'

/**
 * The synthesis under the standalone-ask checks, plus coverage: every planned
 * sub-question gets exactly one status, and none that the plan never had. A
 * gap here is a model failure, never a sub-question quietly reported as
 * established.
 */
export function parseSynthesis(
  content: string,
  plan: readonly SubQuestion[],
  suppliedCount: number,
): Synthesis {
  const synthesis = parseModelJson(content, SynthesisSchema, 'Synthesis')
  assertSourcesSupplied(synthesis, suppliedCount)
  const seen = new Set(synthesis.subQuestions.map((entry) => entry.index))
  if (
    seen.size !== synthesis.subQuestions.length ||
    seen.size !== plan.length ||
    plan.some((entry) => !seen.has(entry.index))
  )
    throw new ApiError(
      'invalid_model_answer',
      'Synthesis did not report every sub-question exactly once',
    )
  return synthesis
}
