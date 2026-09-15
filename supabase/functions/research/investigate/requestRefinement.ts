import { requestChatCompletion } from '../answer/requestChatCompletion.ts'
import { budgetUsageSink } from './budgetUsageSink.ts'
import { parseRefinement } from './parseRefinement.ts'
import { refinePrompt } from './refinePrompt.ts'
import type { SubQuestion } from './SubQuestion.ts'
import type { TokenBudget } from './TokenBudget.ts'

/** One completion that may reformulate one of the sub-questions that found
 * nothing. The model sees questions only, never corpus text. */
export async function requestRefinement(
  question: string,
  empty: readonly SubQuestion[],
  budget: TokenBudget,
): Promise<SubQuestion | null> {
  budget.assertAvailable()
  const listed = empty
    .map((entry) => `${String(entry.index)}. ${entry.question}`)
    .join('\n')
  const content = await requestChatCompletion(
    {
      system: refinePrompt,
      user:
        `Main question: ${question}\n\nSub-questions with no passage:\n${listed}\n\n` +
        'Reformulate one of them, or decline.',
      maxTokens: 200,
      json: true,
      failureMessage: 'Refinement failed',
    },
    budgetUsageSink(budget),
  )
  return parseRefinement(content, empty)
}
