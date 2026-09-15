import { compareApiFixture } from './compareApiFixture.ts'
import { compareContentFixture } from './compareContentFixture.ts'
import type { CompareScenarioOptions } from './CompareScenarioOptions.ts'
import { completionResponseFixture } from './completionResponseFixture.ts'
import { kindFilterOf } from './kindFilterOf.ts'

/** A fetch that records every call and answers the provider and the database. */
export function compareTransportFixture(options: CompareScenarioOptions) {
  const requests: { url: string; body: string }[] = []
  const sides = options.sides ?? { interviews: true, filings: true }
  const completion =
    options.completion ??
    (async () => completionResponseFixture(compareContentFixture()))
  const fetcher: typeof fetch = async (input, init) => {
    const request = new Request(input, init)
    const body = await request.clone().text()
    requests.push({ url: request.url, body })
    const url = new URL(request.url)
    if (url.href === 'https://api.openai.com/v1/chat/completions')
      return completion()
    if (url.href === 'https://api.openai.com/v1/embeddings')
      return new Response(null, { status: 503 })
    if (url.origin !== 'https://example.supabase.co')
      throw new Error('Unexpected external request')
    return new Response(
      JSON.stringify(compareApiFixture(url, kindFilterOf(body), sides)),
      { headers: { 'content-type': 'application/json' } },
    )
  }
  return { fetcher, requests }
}
