import { fixtureKey } from './fixtureKey.ts'
import { investigateApiFixture } from './investigateApiFixture.ts'
import type { InvestigateScenarioOptions } from './InvestigateScenarioOptions.ts'

/**
 * Answers provider completions from the scripted queue, embeddings with a 503
 * (so every retrieval is lexical), and Supabase routes from the investigation
 * fixture. A completion past the end of the queue is a provider failure.
 */
export function investigateTransportFixture(
  options: InvestigateScenarioOptions,
) {
  const queue = [...options.completions]
  const requests: Request[] = []
  const fetcher: typeof fetch = async (input, init) => {
    const request = new Request(input, init)
    requests.push(request)
    const url = new URL(request.url)
    if (url.href === 'https://api.openai.com/v1/chat/completions') {
      const content = queue.shift()
      if (content === undefined) return new Response(null, { status: 500 })
      return new Response(
        JSON.stringify({
          choices: [{ message: { content } }],
          ...(options.usage ? { usage: options.usage } : {}),
        }),
        { headers: { 'content-type': 'application/json' } },
      )
    }
    if (url.href === 'https://api.openai.com/v1/embeddings')
      return new Response(null, { status: 503 })
    if (url.origin !== 'https://example.supabase.co')
      throw new Error('Unexpected external request')
    return new Response(
      JSON.stringify(
        await investigateApiFixture(fixtureKey(url), request, options),
      ),
      { headers: { 'content-type': 'application/json' } },
    )
  }
  return { fetcher, requests }
}
