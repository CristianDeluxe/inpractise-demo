import { embeddingVectorFixture } from './embeddingVectorFixture.ts'
import { jsonResponseFixture } from './jsonResponseFixture.ts'

/**
 * A fetch stub for the embedding cache alone: the query_embeddings table
 * answers with `cached` (or a miss), and the provider always answers with a
 * fixed vector, so a test can tell which path a call took from the requests
 * it recorded.
 */
export function embeddingCacheTransportFixture(cached: number[] | null) {
  const requests: Request[] = []
  const fetcher: typeof fetch = async (input, init) => {
    const request = new Request(input, init)
    requests.push(request)
    const url = new URL(request.url)
    if (
      url.pathname === '/rest/v1/query_embeddings' &&
      request.method === 'GET'
    )
      return jsonResponseFixture(
        cached ? [{ embedding: JSON.stringify(cached) }] : [],
      )
    if (
      url.pathname === '/rest/v1/query_embeddings' &&
      request.method === 'POST'
    )
      return jsonResponseFixture(null, 201)
    if (url.href === 'https://api.openai.com/v1/embeddings')
      return jsonResponseFixture({
        data: [{ embedding: embeddingVectorFixture(2) }],
      })
    throw new Error(`Unexpected request: ${url.href}`)
  }
  return { fetcher, requests }
}
