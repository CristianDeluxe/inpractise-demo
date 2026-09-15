import { assertAgreeingPair } from './assertAgreeingPair.ts'
import { assertNoCompareDisclosure } from './assertNoCompareDisclosure.ts'
import { compareContentFixture } from './compareContentFixture.ts'
import { completionResponseFixture } from './completionResponseFixture.ts'
import { runCompareScenario } from './runCompareScenario.ts'

Deno.test('a cross-reference pairs grounded claims across sides', async (t) => {
  await t.step(
    'an agreeing pair maps to server-owned ids and exact citations',
    async () => {
      const { stages, result } = await runCompareScenario()
      const order = stages.map((stage) => stage.phase).join(' ')
      if (order !== 'debited retrieved selected generating verifying')
        throw new Error(`Unexpected phase order: ${order}`)
      assertAgreeingPair(result)
    },
  )
  await t.step('a contradiction survives as one', async () => {
    const { result } = await runCompareScenario({
      completion: async () =>
        completionResponseFixture(
          compareContentFixture({
            relations: [
              { interviewClaim: 1, filingClaim: 1, relation: 'contradicts' },
              { interviewClaim: 1, filingClaim: 1, relation: 'contradicts' },
            ],
          }),
        ),
    })
    if (
      result.relations.length !== 1 ||
      result.relations[0]?.relation !== 'contradicts'
    )
      throw new Error('The contradiction was not reported exactly once')
  })
  await t.step(
    'retrieval runs once per side, filtered by kind in the database',
    async () => {
      const { requests } = await runCompareScenario()
      const kinds = requests
        .filter((request) => request.url.includes('/rpc/search_candidates'))
        .map((request) => JSON.parse(request.body) as { kind_filter?: string })
        .map((body) => body.kind_filter)
      if (kinds.join(' ') !== 'synthetic_interview sec_filing')
        throw new Error(`Unexpected kind filters: ${kinds.join(' ')}`)
    },
  )
  await t.step('no stage discloses claim text or a quotation', async () => {
    const { stages, result } = await runCompareScenario()
    assertNoCompareDisclosure(stages, result)
  })
})
