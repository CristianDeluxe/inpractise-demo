import { runCompareScenario } from './runCompareScenario.ts'

Deno.test(
  'a cross-reference may scope to every authorized company',
  async (t) => {
    await t.step(
      'an omitted company reaches retrieval and the result',
      async () => {
        const { result, requests } = await runCompareScenario({
          company: undefined,
        })
        if (result.company !== undefined)
          throw new Error(
            `Expected no company in the result, saw ${result.company}`,
          )
        const retrieval = requests.find(
          (request) =>
            request.url.endsWith('/rpc/search_candidates_scoped') ||
            request.url.endsWith('/rpc/search_candidates'),
        )
        if (!retrieval) throw new Error('Retrieval was never called')
        if (retrieval.body.includes('company_filter'))
          throw new Error('An unscoped compare still filtered by company')
      },
    )

    await t.step(
      'an uncovered side names every authorized company, not one company',
      async () => {
        const { result } = await runCompareScenario({
          company: undefined,
          sides: { interviews: true, filings: false },
        })
        const message = result.sides.filings.missingEvidence[0] ?? ''
        if (!message.includes('across all authorized companies'))
          throw new Error(`Unexpected uncovered message: ${message}`)
      },
    )
  },
)
