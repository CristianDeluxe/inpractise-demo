import { z } from 'zod'
import { assertAnswerError } from './assertAnswerError.ts'
import { assertGroundedResponse } from './assertGroundedResponse.ts'
import { captureResearchHandler } from './captureResearchHandler.ts'
import { completionResponseFixture } from './completionResponseFixture.ts'
import { invalidAnswerCases } from './invalidAnswerCases.ts'
import { providerContentFixture } from './providerContentFixture.ts'
import { runAnswerScenario } from './runAnswerScenario.ts'

Deno.test('HTTP answer contract with a stubbed provider', async (test) => {
  const handler = await captureResearchHandler()
  await test.step('server maps a valid source label to the exact supplied passage', async () => {
    const { response, requests } = await runAnswerScenario(handler, async () =>
      completionResponseFixture(providerContentFixture()),
    )
    await assertGroundedResponse(response)
    if (
      !requests
        .filter((request) => request.url.includes('/rest/v1/'))
        .every(
          (request) =>
            request.headers.get('authorization') === 'Bearer test-user-token',
        )
    )
      throw new Error('Caller identity was not forwarded')
  })
  for (const { name, content } of invalidAnswerCases) {
    await test.step(`${name} returns INVALID_ANSWER, not no_evidence`, async () => {
      const { response } = await runAnswerScenario(handler, async () =>
        completionResponseFixture(content),
      )
      await assertAnswerError(response, 'invalid_model_answer')
    })
  }
  for (const status of [429, 500, 503]) {
    await test.step(`provider HTTP ${String(status)} is a retryable dependency error`, async () => {
      const { response } = await runAnswerScenario(handler, async () =>
        Promise.resolve(new Response(null, { status })),
      )
      await assertAnswerError(response, 'dependency_failure')
    })
  }
  await test.step('a network rejection is an error, never a refusal', async () => {
    const { response } = await runAnswerScenario(handler, async () =>
      Promise.reject(new TypeError('Stubbed provider unavailable')),
    )
    await assertAnswerError(response, 'dependency_failure')
  })
  await test.step('a malformed provider transport envelope remains an error', async () => {
    const { response } = await runAnswerScenario(handler, async () =>
      Promise.resolve(new Response('not json')),
    )
    await assertAnswerError(response, 'dependency_failure')
  })
  await test.step('an empty provider completion is an invalid answer', async () => {
    const { response } = await runAnswerScenario(handler, async () =>
      completionResponseFixture(''),
    )
    await assertAnswerError(response, 'invalid_model_answer')
  })
  await test.step('a valid generated refusal preserves its missing-evidence explanation', async () => {
    const { response } = await runAnswerScenario(handler, async () =>
      completionResponseFixture(
        JSON.stringify({
          status: 'not_found',
          claims: [],
          missingEvidence: ['No forecast is established.'],
        }),
      ),
    )
    if (response.status !== 200)
      throw new Error('Valid refusal did not succeed')
    z.object({
      data: z.object({
        status: z.literal('not_found'),
        claims: z.tuple([]),
        citations: z.tuple([]),
        missingEvidence: z.tuple([z.literal('No forecast is established.')]),
      }),
    }).parse(await response.json())
  })
})
