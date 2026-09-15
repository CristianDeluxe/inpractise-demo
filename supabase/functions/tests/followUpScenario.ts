import { askStages } from '../research/actions/askStages.ts'
import { effectivePrincipal } from '../research/effectivePrincipal.ts'
import { answerTransportFixture } from './answerTransportFixture.ts'
import { completionResponseFixture } from './completionResponseFixture.ts'
import { providerContentFixture } from './providerContentFixture.ts'
import { viewAsPrincipalFixture } from './viewAsPrincipalFixture.ts'
import { withTestEnvironment } from './withTestEnvironment.ts'

/**
 * Asks "And in February?" with the given earlier turns. Provider completions
 * are answered from the queue in order, then with a grounded answer, so a
 * rewrite comes first when there is history and the generation follows.
 */
export async function followUpScenario(
  history: { question: string; answer: string }[],
  completions: string[],
) {
  const queue = [...completions]
  const { fetcher, requests } = answerTransportFixture(async () =>
    completionResponseFixture(queue.shift() ?? providerContentFixture()),
  )
  const principal = effectivePrincipal(
    viewAsPrincipalFixture(fetcher),
    undefined,
  )
  const original = globalThis.fetch
  globalThis.fetch = fetcher
  let result: unknown
  try {
    await withTestEnvironment(
      {
        SUPABASE_URL: 'https://example.supabase.co',
        SUPABASE_ANON_KEY: 'test-public-key',
        OPENAI_API_KEY: 'test-provider-key',
      },
      async () => {
        const run = askStages(principal, 'And in February?', undefined, history)
        let step = await run.next()
        while (!step.done) step = await run.next()
        result = step.value
      },
    )
  } finally {
    globalThis.fetch = original
  }
  return {
    result: result as { resolvedQuery?: string },
    completions: requests.filter(
      (request) => request.url === 'https://api.openai.com/v1/chat/completions',
    ),
    retrieval: requests.find((request) =>
      request.url.includes('/rest/v1/rpc/search_candidates'),
    ),
  }
}
