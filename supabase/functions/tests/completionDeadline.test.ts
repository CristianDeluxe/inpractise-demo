import { assertAnswerError } from './assertAnswerError.ts'
import { captureResearchHandler } from './captureResearchHandler.ts'
import { completionResponseFixture } from './completionResponseFixture.ts'
import { providerContentFixture } from './providerContentFixture.ts'
import { runAnswerScenario } from './runAnswerScenario.ts'
import { stalledBodyFixture } from './stalledBodyFixture.ts'

Deno.test('the generation deadline covers body consumption', async (test) => {
  const handler = await captureResearchHandler()
  await test.step('a provider that answers headers and stalls fails as a dependency', async () => {
    const { response } = await runAnswerScenario(handler, stalledBodyFixture, {
      GENERATION_DEADLINE_MS: '50',
    })
    await assertAnswerError(response, 'dependency_failure')
  })
  await test.step('a prompt answer under the same deadline still succeeds', async () => {
    const { response } = await runAnswerScenario(
      handler,
      async () => completionResponseFixture(providerContentFixture()),
      { GENERATION_DEADLINE_MS: '2000' },
    )
    if (response.status !== 200)
      throw new Error(
        `Expected a grounded answer, got ${String(response.status)}`,
      )
  })
})
