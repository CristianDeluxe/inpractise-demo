import type { AskHistoryTurn } from './AskHistoryTurn.ts'
import { condensePrompt } from './condensePrompt.ts'
import { condenseTranscript } from './condenseTranscript.ts'
import { requestChatCompletion } from './requestChatCompletion.ts'

/**
 * One short completion that turns a follow-up into a standalone question.
 * Same transport, deadline and failure mapping as answer generation: a
 * provider failure here is a dependency error, never a refusal.
 */
export async function requestCondensation(
  query: string,
  history: readonly AskHistoryTurn[],
): Promise<string> {
  return await requestChatCompletion(
    {
      system: condensePrompt,
      user: condenseTranscript(query, history),
      maxTokens: 200,
      json: false,
      failureMessage: 'Question rewrite failed',
    },
    async () => {},
  )
}
