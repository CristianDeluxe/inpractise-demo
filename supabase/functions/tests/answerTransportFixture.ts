import { fixtureKey } from './fixtureKey.ts'
import { researchApiFixture } from './researchApiFixture.ts'

export function answerTransportFixture(completion: () => Promise<Response>) {
  const requests: Request[] = []
  const fetcher: typeof fetch = async (input, init) => {
    const request = new Request(input, init)
    requests.push(request)
    const url = new URL(request.url)
    if (url.href === 'https://api.openai.com/v1/chat/completions')
      return completion()
    if (url.href === 'https://api.openai.com/v1/embeddings')
      return new Response(null, { status: 503 })
    if (url.origin !== 'https://example.supabase.co')
      throw new Error('Unexpected external request')
    return new Response(JSON.stringify(researchApiFixture(fixtureKey(url))), {
      headers: { 'content-type': 'application/json' },
    })
  }
  return { fetcher, requests }
}
