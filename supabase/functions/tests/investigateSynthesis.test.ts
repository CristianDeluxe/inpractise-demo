import { investigateScenario } from './investigateScenario.ts'
import { planContentFixture } from './planContentFixture.ts'
import { synthesisContentFixture } from './synthesisContentFixture.ts'

Deno.test('synthesis is held to the grounded-claim contract', async (t) => {
  const northstar = 'How long did the Northstar migration take?'
  const harbor = 'How long did the Harbor migration take?'
  const plan = planContentFixture([
    { question: northstar },
    { question: harbor },
  ])
  await t.step('every sub-question must be reported exactly once', async () => {
    for (const parts of [
      [{ index: 1, status: 'answered' }],
      [
        { index: 1, status: 'answered' },
        { index: 1, status: 'answered' },
      ],
      [
        { index: 1, status: 'answered' },
        { index: 3, status: 'answered' },
      ],
    ]) {
      const { failure } = await investigateScenario({
        completions: [plan, synthesisContentFixture(parts)],
      })
      if (failure?.code !== 'invalid_model_answer')
        throw new Error(`Accepted coverage ${JSON.stringify(parts)}`)
    }
  })
  await t.step('a claim may only cite a supplied passage', async () => {
    const { failure } = await investigateScenario({
      completions: [
        plan,
        synthesisContentFixture(
          [
            { index: 1, status: 'answered' },
            { index: 2, status: 'answered' },
          ],
          [{ text: 'Invented.', sources: [7] }],
        ),
      ],
    })
    if (failure?.code !== 'invalid_model_answer')
      throw new Error(
        `Expected invalid_model_answer, saw ${String(failure?.code)}`,
      )
  })
  await t.step(
    'a part with no passage cannot be reported established',
    async () => {
      const { result, failure } = await investigateScenario({
        completions: [
          plan,
          JSON.stringify({ index: null }),
          synthesisContentFixture([
            { index: 1, status: 'answered' },
            { index: 2, status: 'answered' },
          ]),
        ],
        emptyQueries: [harbor],
      })
      if (failure)
        throw new Error(`Unexpected failure: ${String(failure.code)}`)
      const parts = result?.['subQuestions'] as {
        status: string
        citationIds: string[]
      }[]
      if (parts[1]?.status !== 'not_found' || parts[1].citationIds.length)
        throw new Error('An unsupported part was reported established')
      if (parts[0]?.status !== 'answered' || !parts[0].citationIds.length)
        throw new Error('The supported part lost its citations')
    },
  )
  await t.step(
    'no readable passage anywhere is a refusal, not a call',
    async () => {
      const { result, completions, stages } = await investigateScenario({
        completions: [plan, JSON.stringify({ index: null })],
        emptyQueries: [northstar, harbor],
      })
      if (result?.['status'] !== 'not_found' || completions.length !== 2)
        throw new Error('Synthesis ran with nothing to cite')
      if (stages.some((stage) => stage.phase === 'synthesise'))
        throw new Error('A synthesise stage was reported without a synthesis')
    },
  )
  await t.step('no stage discloses evidence before the recheck', async () => {
    const { stages, result } = await investigateScenario({
      completions: [
        plan,
        synthesisContentFixture([
          { index: 1, status: 'answered' },
          { index: 2, status: 'answered' },
        ]),
      ],
    })
    const answer = result as {
      claims: { text: string }[]
      citations: { quote: string }[]
    }
    if (!answer.claims.length || !answer.citations.length)
      throw new Error('Expected the fixture to produce a cited claim')
    for (const stage of stages) {
      const serialised = JSON.stringify(stage)
      for (const claim of answer.claims)
        if (serialised.includes(claim.text))
          throw new Error(`Stage ${stage.phase} disclosed claim text`)
      for (const citation of answer.citations)
        if (serialised.includes(citation.quote))
          throw new Error(`Stage ${stage.phase} disclosed a passage quotation`)
    }
  })
})
