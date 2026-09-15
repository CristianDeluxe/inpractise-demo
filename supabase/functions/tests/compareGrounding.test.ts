import { ApiError } from '../_shared/http/ApiError.ts'
import { completionResponseFixture } from './completionResponseFixture.ts'
import { invalidComparisonCases } from './invalidComparisonCases.ts'
import { runCompareScenario } from './runCompareScenario.ts'

Deno.test('an ungrounded cross-reference is a model failure', async (t) => {
  for (const { name, content } of invalidComparisonCases) {
    await t.step(`${name} is rejected as invalid_model_answer`, async () => {
      try {
        await runCompareScenario({
          completion: async () => completionResponseFixture(content),
        })
      } catch (error) {
        if (error instanceof ApiError && error.code === 'invalid_model_answer')
          return
        throw error
      }
      throw new Error('The reply was accepted')
    })
  }
  await t.step(
    'a quotation that only differs in whitespace is accepted',
    async () => {
      const { result } = await runCompareScenario({
        completion: async () =>
          completionResponseFixture(
            JSON.stringify({
              interviews: {
                status: 'answered',
                claims: [
                  {
                    text: 'Six weeks.',
                    quote: 'moved  in\nsix weeks',
                    sources: [1],
                  },
                ],
                missingEvidence: [],
              },
              filings: {
                status: 'partial',
                claims: [
                  {
                    text: 'One quarter.',
                    quote: 'completed within one quarter',
                    sources: [2],
                  },
                ],
                missingEvidence: ['No figure for larger customers.'],
              },
              relations: [
                { interviewClaim: 1, filingClaim: 1, relation: 'extends' },
              ],
            }),
          ),
      })
      if (result.sides.filings.status !== 'partial')
        throw new Error('The side status was not preserved')
      if (result.relations[0]?.relation !== 'extends')
        throw new Error('The relation was not preserved')
    },
  )
})
