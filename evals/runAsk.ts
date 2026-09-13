import type { Target } from '../scripts/db/Target.ts'
import { ask } from '../src/api/ask.ts'
import { createResearchClient } from '../src/api/createResearchClient.ts'
import type { AskResult } from './AskResult.ts'
import { AskResultSchema } from './AskResultSchema.ts'

/** Runs one question through the same client the browser uses. */
export async function runAsk(
  target: Target,
  token: string,
  question: string,
  company: string,
): Promise<AskResult> {
  const client = createResearchClient({
    baseUrl: target.url,
    publishableKey: target.publishableKey,
    getAccessToken: () => token,
  })
  const envelope = await ask<AskResult>(
    client,
    { action: 'ask', query: question, company },
    (input) => AskResultSchema.parse(input),
  )
  return envelope.data
}
