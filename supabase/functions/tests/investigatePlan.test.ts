import { investigateScenario } from './investigateScenario.ts'
import { planContentFixture } from './planContentFixture.ts'
import { synthesisContentFixture } from './synthesisContentFixture.ts'

Deno.test('the plan is bounded and scoped to the visible corpus', async (t) => {
  const northstar = 'How long did the Northstar migration take?'
  const harbor = 'How long did the Harbor migration take?'
  const completions = [
    planContentFixture([
      { question: northstar, company: 'northstar-workflow' },
      { question: harbor },
    ]),
    synthesisContentFixture([
      { index: 1, status: 'answered' },
      { index: 2, status: 'partial' },
    ]),
  ]
  await t.step(
    'the phases run in the order that gives them meaning',
    async () => {
      const { stages, result, failure } = await investigateScenario({
        completions,
      })
      if (failure)
        throw new Error(`Unexpected failure: ${String(failure.code)}`)
      const order = stages.map((stage) => stage.phase).join(' ')
      if (order !== 'debited plan retrieve retrieve synthesise')
        throw new Error(`Unexpected phase order: ${order}`)
      if (typeof result?.['elapsedMs'] !== 'number')
        throw new Error('The result carried no elapsed time')
    },
  )
  await t.step('scope and per-part status travel with the plan', async () => {
    const { stages, result } = await investigateScenario({ completions })
    const plan = stages.find((stage) => stage.phase === 'plan')
    const scoped =
      plan?.phase === 'plan' ? plan.subQuestions[0]?.company : undefined
    if (scoped !== 'northstar-workflow')
      throw new Error('The plan stage lost the sub-question scope')
    const parts = result?.['subQuestions'] as { status: string }[]
    if (parts.map((part) => part.status).join(' ') !== 'answered partial')
      throw new Error('The per-part statuses were not carried')
  })
  await t.step('more than four sub-questions are truncated', async () => {
    const { stages, result, retrievals } = await investigateScenario({
      completions: [
        planContentFixture(
          Array.from({ length: 6 }, (_entry, index) => ({
            question: `Sub-question ${String(index + 1)}`,
          })),
        ),
        synthesisContentFixture(
          [1, 2, 3, 4].map((index) => ({ index, status: 'answered' })),
        ),
      ],
    })
    const retrieves = stages.filter((stage) => stage.phase === 'retrieve')
    if (retrieves.length !== 4 || retrievals.length !== 4)
      throw new Error(
        `Expected four retrievals, saw ${String(retrievals.length)}`,
      )
    const subQuestions = result?.['subQuestions'] as unknown[] | undefined
    if (subQuestions?.length !== 4)
      throw new Error('The result reported more than four sub-questions')
  })
  await t.step('a company outside the corpus is rejected', async () => {
    const { failure, retrievals } = await investigateScenario({
      completions: [
        planContentFixture([{ question: northstar, company: 'acme-unknown' }]),
      ],
    })
    if (failure?.code !== 'invalid_model_answer')
      throw new Error(
        `Expected invalid_model_answer, saw ${String(failure?.code)}`,
      )
    if (retrievals.length) throw new Error('Retrieval ran on a rejected plan')
  })
  await t.step('a scoped request narrows every sub-question', async () => {
    const { failure, stages } = await investigateScenario({
      company: 'harbor-logistics',
      completions: [
        planContentFixture([{ question: harbor }, { question: northstar }]),
        synthesisContentFixture([
          { index: 1, status: 'answered' },
          { index: 2, status: 'answered' },
        ]),
      ],
    })
    if (failure) throw new Error(`Unexpected failure: ${String(failure.code)}`)
    const plan = stages.find((stage) => stage.phase === 'plan')
    if (
      plan?.phase !== 'plan' ||
      plan.subQuestions.some((entry) => entry.company !== 'harbor-logistics')
    )
      throw new Error('A sub-question escaped the request scope')
  })
})
