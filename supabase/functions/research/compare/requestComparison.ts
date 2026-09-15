import { completeChat } from '../answer/completeChat.ts'
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
  return completeChat(
    {
      max_completion_tokens: 1_200,
      response_format: { type: 'json_object' },
      messages: [
        { role: 'system', content: compareSystemPrompt },
        {
          role: 'user',
          content: comparisonPrompt(topic, sides.interviews, sides.filings),
        },
      ],
    },
    'Cross-reference failed',
    onUsage,
  )
}
