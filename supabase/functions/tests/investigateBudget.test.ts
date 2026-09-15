import { investigateScenario } from './investigateScenario.ts'
import { planContentFixture } from './planContentFixture.ts'
import { synthesisContentFixture } from './synthesisContentFixture.ts'

Deno.test('one token budget bounds the whole loop', async (t) => {
  const plan = planContentFixture([
    { question: 'How long did the Northstar migration take?' },
    { question: 'How long did the Harbor migration take?' },
  ])
  const synthesis = synthesisContentFixture([
    { index: 1, status: 'answered' },
    { index: 2, status: 'answered' },
  ])
  const usage = { prompt_tokens: 12, completion_tokens: 3, total_tokens: 15 }
  await t.step('exhaustion refuses the next call as an error', async () => {
    const { failure, completions, result } = await investigateScenario({
      completions: [plan, synthesis],
      usage,
      environment: { INVESTIGATE_TOKEN_BUDGET: '10' },
    })
    if (failure?.code !== 'allowance_exhausted')
      throw new Error(
        `Expected allowance_exhausted, saw ${String(failure?.code)}`,
      )
    if (completions.length !== 1 || result !== undefined)
      throw new Error('A call ran past the budget')
  })
  await t.step('a tight budget skips refinement, not synthesis', async () => {
    const { failure, completions, result } = await investigateScenario({
      completions: [plan, synthesis],
      usage,
      emptyQueries: ['How long did the Harbor migration take?'],
      environment: { INVESTIGATE_TOKEN_BUDGET: '5000' },
    })
    if (failure) throw new Error(`Unexpected failure: ${String(failure.code)}`)
    if (completions.length !== 2 || result?.['refinement'] !== 'budget')
      throw new Error('Refinement ran without room for the synthesis after it')
  })
  await t.step('usage is recorded once, as the sum of every call', async () => {
    const { requests, failure } = await investigateScenario({
      completions: [plan, synthesis],
      usage,
    })
    if (failure) throw new Error(`Unexpected failure: ${String(failure.code)}`)
    const recorded = requests.filter((request) =>
      request.url.endsWith('/rpc/record_request_usage'),
    )
    if (recorded.length !== 1)
      throw new Error(
        `Expected one usage record, saw ${String(recorded.length)}`,
      )
    const body = (await recorded[0]?.clone().json()) as { total?: number }
    if (body.total !== 30)
      throw new Error(`Recorded total was ${String(body.total)}, expected 30`)
    const debit = requests.findIndex((request) =>
      request.url.endsWith('/rpc/debit_request'),
    )
    const provider = requests.findIndex(
      (request) => new URL(request.url).hostname === 'api.openai.com',
    )
    if (debit < 0 || debit >= provider)
      throw new Error('A provider call ran before the debit')
  })
  await t.step('the debit happens exactly once', async () => {
    const { requests } = await investigateScenario({
      completions: [plan, synthesis],
    })
    const debits = requests.filter((request) =>
      request.url.endsWith('/rpc/debit_request'),
    )
    if (debits.length !== 1)
      throw new Error(`Expected one debit, saw ${String(debits.length)}`)
  })
})
