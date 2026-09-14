import { ApiError } from '../../_shared/http/ApiError.ts'
import type { CitationSource } from '../citations/CitationSource.ts'
import { requireEnv } from '../requireEnv.ts'
import { buildContext } from './buildContext.ts'
import { completionDeadlineMs } from './completionDeadlineMs.ts'
import { consumeCompletion } from './consumeCompletion.ts'
import { requestGeneration } from './requestGeneration.ts'
import { systemPrompt } from './systemPrompt.ts'

/**
 * One generation, no retry, hard deadline. The deadline covers reading the
 * body as well as obtaining the headers: a provider that answers and then
 * stalls must fail, not wait. A provider failure raises a dependency error; it
 * must never reach the reader as "no evidence".
 */
export async function requestCompletion(
  query: string,
  sources: readonly CitationSource[],
  onUsage: (usage: unknown) => Promise<void>,
): Promise<string> {
  const controller = new AbortController()
  const timer = setTimeout(() => {
    controller.abort()
  }, completionDeadlineMs())
  try {
    const response = await requestGeneration(
      'https://api.openai.com/v1/chat/completions',
      {
        method: 'POST',
        signal: controller.signal,
        headers: {
          authorization: `Bearer ${requireEnv('OPENAI_API_KEY')}`,
          'content-type': 'application/json',
        },
        body: JSON.stringify({
          model: 'gpt-4.1-mini-2025-04-14',
          max_completion_tokens: 800,
          temperature: 0,
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
        }),
      },
    )
    if (!response.ok)
      throw new ApiError('dependency_failure', 'Generation failed', true)
    return await consumeCompletion(response, controller.signal, onUsage)
  } finally {
    clearTimeout(timer)
  }
}
