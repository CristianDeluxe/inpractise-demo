import { z } from 'zod'
import { assertAnswerError } from './assertAnswerError.ts'
import { assertGroundedResponse } from './assertGroundedResponse.ts'
import { captureResearchHandler } from './captureResearchHandler.ts'
import type { CompletionRequestBody } from './CompletionRequestBody.ts'
import { completionWithUsageFixture } from './completionWithUsageFixture.ts'
import { providerContentFixture } from './providerContentFixture.ts'
import { runAnswerScenario } from './runAnswerScenario.ts'
import { tooManyClaimsContentFixture } from './tooManyClaimsContentFixture.ts'

Deno.test('ask retries once when only the claim limits fail', async (t) => {
  const handler = await captureResearchHandler()

  await t.step(
    'a fifth claim is retried and the valid reply is grounded',
    async () => {
      const replies = [tooManyClaimsContentFixture(), providerContentFixture()]
      const { response, requests } = await runAnswerScenario(
        handler,
        async () => completionWithUsageFixture(replies.shift() ?? ''),
        {},
        2,
      )
      await assertGroundedResponse(response)
      const completions = requests.filter((request) =>
        request.url.endsWith('/chat/completions'),
      )
      const retryBody = JSON.parse(
        await (completions[1]?.clone().text() ?? Promise.resolve('{}')),
      ) as CompletionRequestBody
      if (!retryBody.messages[1]?.content.includes('at most 4 claims'))
        throw new Error('The retry did not restate the claim limit')
      const usageWrites = requests.filter((request) =>
        request.url.endsWith('/rpc/record_request_usage'),
      )
      if (usageWrites.length !== 1)
        throw new Error(
          `Expected one usage write, saw ${String(usageWrites.length)}`,
        )
      z.object({
        prompt: z.literal(200),
        completion: z.literal(100),
        total: z.literal(300),
      }).parse(await usageWrites[0]?.clone().json())
    },
  )

  await t.step(
    'a second over-limit reply is an invalid answer, not retried again',
    async () => {
      const { response } = await runAnswerScenario(
        handler,
        async () => completionWithUsageFixture(tooManyClaimsContentFixture()),
        {},
        2,
      )
      await assertAnswerError(response, 'invalid_model_answer')
    },
  )
})
