import { askStages } from '../research/actions/askStages.ts'
import type { AskStage } from '../research/answer/AskStage.ts'
import { effectivePrincipal } from '../research/effectivePrincipal.ts'
import type { ViewAs } from '../research/ViewAs.ts'
import { diagnosticsTransportFixture } from './diagnosticsTransportFixture.ts'
import { viewAsPrincipalFixture } from './viewAsPrincipalFixture.ts'
import { withTestEnvironment } from './withTestEnvironment.ts'

/** Answers one question as the given viewing mode and reports every stage it
 * yielded alongside its terminal value. */
export async function runStageScenario(viewAs: ViewAs | undefined) {
  const fetcher = diagnosticsTransportFixture()
  const principal = effectivePrincipal(viewAsPrincipalFixture(fetcher), viewAs)
  const original = globalThis.fetch
  globalThis.fetch = fetcher
  const stages: AskStage[] = []
  let result: unknown
  try {
    await withTestEnvironment(
      {
        SUPABASE_URL: 'https://example.supabase.co',
        SUPABASE_ANON_KEY: 'test-public-key',
        OPENAI_API_KEY: 'test-provider-key',
      },
      async () => {
        const run = askStages(principal, 'What does the source say?', undefined)
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
  return { stages, result }
}
