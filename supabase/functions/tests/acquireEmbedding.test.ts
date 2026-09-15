import { acquireEmbedding } from '../research/answer/acquireEmbedding.ts'
import { embeddingCacheTransportFixture } from './embeddingCacheTransportFixture.ts'
import { embeddingVectorFixture } from './embeddingVectorFixture.ts'
import { viewAsPrincipalFixture } from './viewAsPrincipalFixture.ts'
import { withGlobalFetch } from './withGlobalFetch.ts'
import { withTestEnvironment } from './withTestEnvironment.ts'

Deno.test('acquireEmbedding', async (t) => {
  await t.step('a cache hit never calls the provider', async () => {
    const stored = embeddingVectorFixture(1)
    const { fetcher, requests } = embeddingCacheTransportFixture(stored)
    await withGlobalFetch(fetcher, async () => {
      await withTestEnvironment(
        { OPENAI_API_KEY: 'test-provider-key' },
        async () => {
          const result = await acquireEmbedding(
            viewAsPrincipalFixture(fetcher),
            'What was said about revenue?',
          )
          if (result.source !== 'cached')
            throw new Error(`Expected a cache hit, saw ${result.source}`)
          if (JSON.stringify(result.vector) !== JSON.stringify(stored))
            throw new Error('Cached vector did not round-trip')
          await result.stored
        },
      )
    })
    const providerCalls = requests.filter(
      (request) => request.url === 'https://api.openai.com/v1/embeddings',
    )
    if (providerCalls.length !== 0)
      throw new Error('A cache hit must not call the embedding provider')
  })

  await t.step(
    'a cache miss calls the provider and offers the result back',
    async () => {
      const { fetcher, requests } = embeddingCacheTransportFixture(null)
      await withGlobalFetch(fetcher, async () => {
        await withTestEnvironment(
          { OPENAI_API_KEY: 'test-provider-key' },
          async () => {
            const result = await acquireEmbedding(
              viewAsPrincipalFixture(fetcher),
              'What was said about revenue?',
            )
            if (result.source !== 'fresh')
              throw new Error(
                `Expected a fresh embedding, saw ${result.source}`,
              )
            await result.stored
          },
        )
      })
      const providerCalls = requests.filter(
        (request) => request.url === 'https://api.openai.com/v1/embeddings',
      )
      if (providerCalls.length !== 1)
        throw new Error(
          `Expected one provider call, saw ${String(providerCalls.length)}`,
        )
      const writes = requests.filter(
        (request) =>
          request.url.includes('/rest/v1/query_embeddings') &&
          request.method === 'POST',
      )
      if (writes.length !== 1)
        throw new Error(
          `Expected the fresh vector to be offered to the cache once, saw ${String(writes.length)}`,
        )
    },
  )
})
