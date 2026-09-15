import { requestChatCompletion } from '../answer/requestChatCompletion.ts'
import type { CitationSource } from '../citations/CitationSource.ts'
import { compareSystemPrompt } from './compareSystemPrompt.ts'
import { comparisonPrompt } from './comparisonPrompt.ts'

/** One cross-reference as JSON, under the same transport and deadline as an answer. */
export async function requestComparison(
  topic: string,
  sides: {
    interviews: readonly CitationSource[]
    filings: readonly CitationSource[]
  },
  onUsage: (usage: unknown) => Promise<void>,
): Promise<string> {
  return requestChatCompletion(
    {
      system: compareSystemPrompt,
      user: comparisonPrompt(topic, sides.interviews, sides.filings),
      maxTokens: 1_200,
      json: true,
      failureMessage: 'Cross-reference failed',
    },
    onUsage,
  )
}
