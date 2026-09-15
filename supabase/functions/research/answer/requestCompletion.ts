import type { CitationSource } from '../citations/CitationSource.ts'
import { buildContext } from './buildContext.ts'
import { completeChat } from './completeChat.ts'
import { systemPrompt } from './systemPrompt.ts'

/** One grounded answer as JSON, under the shared transport and deadline. */
export async function requestCompletion(
  query: string,
  sources: readonly CitationSource[],
  onUsage: (usage: unknown) => Promise<void>,
): Promise<string> {
  return completeChat(
    {
      max_completion_tokens: 800,
      response_format: { type: 'json_object' },
      messages: [
        { role: 'system', content: systemPrompt },
        {
          role: 'user',
          content:
            `Question: ${query}\n\nPassages:\n${buildContext(sources)}\n\n` +
            'Reply with JSON only: {"status":"answered|partial|conflict|not_found",' +
            '"claims":[{"text":"...","sources":[1]}],"missingEvidence":["..."]}',
        },
      ],
    },
    'Generation failed',
    onUsage,
  )
}
