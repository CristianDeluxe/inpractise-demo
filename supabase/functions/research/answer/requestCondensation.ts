import { ApiError } from '../../_shared/http/ApiError.ts'
import { requireEnv } from '../requireEnv.ts'
import type { AskHistoryTurn } from './AskHistoryTurn.ts'
import { completionDeadlineMs } from './completionDeadlineMs.ts'
import { condensePrompt } from './condensePrompt.ts'
import { condenseTranscript } from './condenseTranscript.ts'
import { consumeCompletion } from './consumeCompletion.ts'
import { requestGeneration } from './requestGeneration.ts'

/**
 * One short completion that turns a follow-up into a standalone question.
 * Same transport, deadline and failure mapping as answer generation: a
 * provider failure here is a dependency error, never a refusal.
 */
export async function requestCondensation(
  query: string,
  history: readonly AskHistoryTurn[],
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
          max_completion_tokens: 200,
          temperature: 0,
          messages: [
            { role: 'system', content: condensePrompt },
            { role: 'user', content: condenseTranscript(query, history) },
          ],
        }),
      },
    )
    if (!response.ok)
      throw new ApiError('dependency_failure', 'Question rewrite failed', true)
    return await consumeCompletion(response, controller.signal, async () => {})
  } finally {
    clearTimeout(timer)
  }
}
