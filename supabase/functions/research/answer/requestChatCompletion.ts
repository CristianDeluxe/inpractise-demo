import { ApiError } from '../../_shared/http/ApiError.ts'
import { requireEnv } from '../requireEnv.ts'
import type { ChatCompletionInput } from './ChatCompletionInput.ts'
import { completionDeadlineMs } from './completionDeadlineMs.ts'
import { consumeCompletion } from './consumeCompletion.ts'
import { requestGeneration } from './requestGeneration.ts'

/**
 * One chat completion, no retry, hard deadline. The deadline covers reading
 * the body as well as obtaining the headers: a provider that answers and then
 * stalls must fail, not wait. A provider failure raises a dependency error; it
 * must never reach the reader as "no evidence".
 */
export async function requestChatCompletion(
  input: ChatCompletionInput,
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
          max_completion_tokens: input.maxTokens,
          temperature: 0,
          ...(input.json ? { response_format: { type: 'json_object' } } : {}),
          messages: [
            { role: 'system', content: input.system },
            { role: 'user', content: input.user },
          ],
        }),
      },
    )
    if (!response.ok)
      throw new ApiError('dependency_failure', input.failureMessage, true)
    return await consumeCompletion(response, controller.signal, onUsage)
  } finally {
    clearTimeout(timer)
  }
}
