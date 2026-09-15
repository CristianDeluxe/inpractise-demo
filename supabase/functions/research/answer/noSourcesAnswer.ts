import type { answerScope } from './answerScope.ts'

/**
 * No authorised passage reached the model, which is a refusal rather than a
 * failure: the request worked and the corpus had nothing this caller may read.
 */
export function noSourcesAnswer(scope: ReturnType<typeof answerScope>) {
  return {
    status: 'not_found' as const,
    claims: [],
    missingEvidence: ['No authorised passage matched this question.'],
    citations: [],
    ...scope,
  }
}
