import { investigateScenario } from './investigateScenario.ts'
import { planContentFixture } from './planContentFixture.ts'
import { synthesisContentFixture } from './synthesisContentFixture.ts'
import { synthesisTooBigContentFixture } from './synthesisTooBigContentFixture.ts'

Deno.test(
  'a too_big synthesis is retried once with the limit restated',
  async (t) => {
    const northstar = 'How long did the Northstar migration take?'
    const harbor = 'How long did the Harbor migration take?'
    const coverage = [
      { index: 1, status: 'answered' },
      { index: 2, status: 'answered' },
    ]
    const plan = planContentFixture([
      { question: northstar },
      { question: harbor },
    ])

    await t.step(
      'a second, valid reply is accepted and reaches the reader',
      async () => {
        const { result, failure, completions } = await investigateScenario({
          completions: [
            plan,
            synthesisTooBigContentFixture(coverage),
            synthesisContentFixture(coverage),
          ],
        })
        if (failure)
          throw new Error(`Unexpected failure: ${String(failure.code)}`)
        if (completions.length !== 3)
          throw new Error(
            `Expected the plan and two synthesis attempts, saw ${String(completions.length)}`,
          )
        const retryRequest = completions[2]
        if (!retryRequest) throw new Error('The retry completion was missing')
        const retryBody = JSON.parse(await retryRequest.clone().text()) as {
          messages: { content: string }[]
        }
        if (!retryBody.messages[1]?.content.includes('500 characters'))
          throw new Error('The retry did not restate the length limit')
        if ((result as { status?: string }).status !== 'answered')
          throw new Error('The retried synthesis was not accepted')
      },
    )

    await t.step('a second too_big reply is not retried again', async () => {
      const { failure, completions } = await investigateScenario({
        completions: [
          plan,
          synthesisTooBigContentFixture(coverage),
          synthesisTooBigContentFixture(coverage),
        ],
      })
      if (failure?.code !== 'invalid_model_answer')
        throw new Error(
          `Expected invalid_model_answer, saw ${String(failure?.code)}`,
        )
      if (completions.length !== 3)
        throw new Error(
          `Expected exactly one retry, saw ${String(completions.length)} completions`,
        )
    })

    await t.step(
      'a schema failure other than too_big is never retried',
      async () => {
        const invalidStatus = JSON.stringify({
          status: 'found',
          claims: [{ text: 'Both migrations were short.', sources: [1] }],
          missingEvidence: [],
          subQuestions: coverage,
        })
        const { failure, completions } = await investigateScenario({
          completions: [plan, invalidStatus],
        })
        if (failure?.code !== 'invalid_model_answer')
          throw new Error(
            `Expected invalid_model_answer, saw ${String(failure?.code)}`,
          )
        if (completions.length !== 2)
          throw new Error(
            `A non-too_big failure triggered an unwanted retry: ${String(completions.length)} completions`,
          )
      },
    )
  },
)
