import { compareStages } from '../research/actions/compareStages.ts'
import type { CompareResult } from '../research/compare/CompareResult.ts'
import type { CompareStage } from '../research/compare/CompareStage.ts'
import type { CompareScenarioOptions } from './CompareScenarioOptions.ts'
import { compareTransportFixture } from './compareTransportFixture.ts'
import { viewAsPrincipalFixture } from './viewAsPrincipalFixture.ts'
import { withTestEnvironment } from './withTestEnvironment.ts'

/** Cross-references one topic and reports every stage, the result and every request made. */
export async function runCompareScenario(options: CompareScenarioOptions = {}) {
  const { fetcher, requests } = compareTransportFixture(options)
  const principal = viewAsPrincipalFixture(fetcher)
  const original = globalThis.fetch
  globalThis.fetch = fetcher
  const stages: CompareStage[] = []
  let result: CompareResult | undefined
  try {
    await withTestEnvironment(
      {
        SUPABASE_URL: 'https://example.supabase.co',
        SUPABASE_ANON_KEY: 'test-public-key',
        OPENAI_API_KEY: 'test-provider-key',
      },
      async () => {
        const run = compareStages(principal, {
          company: 'northstar-workflow',
          topic: 'deployment time',
        })
        let step = await run.next()
        while (!step.done) {
          stages.push(step.value)
          step = await run.next()
        }
        result = step.value
      },
    )
  } finally {
    globalThis.fetch = original
  }
  if (!result) throw new Error('The pipeline produced no result')
  return { stages, result, requests }
}
