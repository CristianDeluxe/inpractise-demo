import { investigateStages } from '../research/actions/investigateStages.ts'
import { effectivePrincipal } from '../research/effectivePrincipal.ts'
import type { InvestigateStage } from '../research/investigate/InvestigateStage.ts'
import type { InvestigateScenarioOptions } from './InvestigateScenarioOptions.ts'
import { investigateTransportFixture } from './investigateTransportFixture.ts'
import { viewAsPrincipalFixture } from './viewAsPrincipalFixture.ts'
import { withTestEnvironment } from './withTestEnvironment.ts'

/**
 * Investigates one fixed question under scripted provider replies and reports
 * every stage, the terminal value or the failure, and every request made.
 */
export async function investigateScenario(options: InvestigateScenarioOptions) {
  const { fetcher, requests } = investigateTransportFixture(options)
  const principal = effectivePrincipal(
    viewAsPrincipalFixture(fetcher),
    options.viewAs,
  )
  const original = globalThis.fetch
  globalThis.fetch = fetcher
  const stages: InvestigateStage[] = []
  let result: unknown
  let failure: unknown
  try {
    await withTestEnvironment(
      {
        SUPABASE_URL: 'https://example.supabase.co',
        SUPABASE_ANON_KEY: 'test-public-key',
        OPENAI_API_KEY: 'test-provider-key',
        ...options.environment,
      },
      async () => {
        try {
          const run = investigateStages(
            principal,
            'How did Northstar and Harbor handle migrations?',
            options.company,
          )
          let step = await run.next()
          while (!step.done) {
            stages.push(step.value)
            step = await run.next()
          }
          result = step.value
        } catch (error) {
          failure = error
        }
      },
    )
  } finally {
    globalThis.fetch = original
  }
  return {
    stages,
    result: result as Record<string, unknown> | undefined,
    failure: failure as { code?: string; message?: string } | undefined,
    requests,
    completions: requests.filter(
      (request) => request.url === 'https://api.openai.com/v1/chat/completions',
    ),
    retrievals: requests.filter((request) =>
      request.url.includes('/rest/v1/rpc/search_candidates'),
    ),
  }
}
