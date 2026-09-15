import { investigateScenario } from './investigateScenario.ts'
import { planContentFixture } from './planContentFixture.ts'
import { synthesisContentFixture } from './synthesisContentFixture.ts'

Deno.test('one refinement round runs only for a miss', async (t) => {
  const northstar = 'How long did the Northstar migration take?'
  const obscure = 'What was the cutover cadence at Harbor?'
  const plan = planContentFixture([
    { question: northstar },
    { question: obscure },
  ])
  const statuses = [
    { index: 1, status: 'answered' },
    { index: 2, status: 'answered' },
  ]
  await t.step('a reformulation is retrieved in place', async () => {
    const { stages, result, retrievals, failure } = await investigateScenario({
      completions: [
        plan,
        JSON.stringify({ index: 2, question: 'How long did Harbor take?' }),
        synthesisContentFixture(statuses),
      ],
      emptyQueries: [obscure],
    })
    if (failure) throw new Error(`Unexpected failure: ${String(failure.code)}`)
    const order = stages.map((stage) => stage.phase).join(' ')
    if (order !== 'debited plan retrieve retrieve refine synthesise')
      throw new Error(`Unexpected phase order: ${order}`)
    const queries = await Promise.all(
      retrievals.map(async (request) => {
        const body = (await request.clone().json()) as { query_text: string }
        return body.query_text
      }),
    )
    if (queries.at(-1) !== 'How long did Harbor take?')
      throw new Error(`Refinement did not run: ${queries.join(' | ')}`)
    const parts = result?.['subQuestions'] as {
      question: string
      originalQuestion?: string
      status: string
    }[]
    if (
      parts[1]?.originalQuestion !== obscure ||
      parts[1].status !== 'answered'
    )
      throw new Error('The refined sub-question lost its original question')
    if (result?.['refinement'] !== 'applied')
      throw new Error('The refinement outcome was not reported')
  })
  await t.step('the model may decline, and the miss stays a miss', async () => {
    const { stages, result } = await investigateScenario({
      completions: [
        plan,
        JSON.stringify({ index: null }),
        synthesisContentFixture(statuses),
      ],
      emptyQueries: [obscure],
    })
    if (stages.some((stage) => stage.phase === 'refine'))
      throw new Error('A declined refinement produced a stage')
    const parts = result?.['subQuestions'] as { status: string }[]
    if (
      result?.['refinement'] !== 'declined' ||
      parts[1]?.status !== 'not_found'
    )
      throw new Error('A sub-question with no passage was reported established')
  })
  await t.step('a reformulation of a hit is a model failure', async () => {
    const { failure } = await investigateScenario({
      completions: [plan, JSON.stringify({ index: 1, question: 'Northstar?' })],
      emptyQueries: [obscure],
    })
    if (failure?.code !== 'invalid_model_answer')
      throw new Error(
        `Expected invalid_model_answer, saw ${String(failure?.code)}`,
      )
  })
  await t.step('no miss means no refinement call', async () => {
    const { completions, result } = await investigateScenario({
      completions: [plan, synthesisContentFixture(statuses)],
    })
    if (completions.length !== 2 || result?.['refinement'] !== 'none')
      throw new Error(
        'A refinement ran although every sub-question had evidence',
      )
  })
})
