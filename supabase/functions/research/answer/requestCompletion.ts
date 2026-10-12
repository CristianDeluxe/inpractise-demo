import type { CitationSource } from '../citations/CitationSource.ts'
import { buildContext } from './buildContext.ts'
import { requestChatCompletion } from './requestChatCompletion.ts'
import { systemPrompt } from './systemPrompt.ts'

/**
 * One generation, hard deadline. A provider failure raises a dependency
 * error; it must never reach the reader as "no evidence". `notice` is appended
 * to the user turn when the caller is retrying a rejected reply.
 */
export async function requestCompletion(
  query: string,
  sources: readonly CitationSource[],
  onUsage: (usage: unknown) => Promise<void>,
  notice = '',
): Promise<string> {
  return await requestChatCompletion(
    {
      system: systemPrompt,
      user:
        `Question: ${query}\n\nPassages:\n${buildContext(sources)}\n\n` +
        'Reply with JSON only: {"status":"answered|partial|conflict|not_found",' +
        '"claims":[{"text":"...","sources":[1]}],"missingEvidence":["..."]}' +
        notice,
      maxTokens: 800,
      json: true,
      failureMessage: 'Generation failed',
    },
    onUsage,
  )
}
