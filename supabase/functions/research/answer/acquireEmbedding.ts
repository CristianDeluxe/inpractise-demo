import type { Principal } from '../Principal.ts'
import { embedQuery } from './embedQuery.ts'
import type { QueryEmbedding } from './QueryEmbedding.ts'
import { readCachedEmbedding } from './readCachedEmbedding.ts'
import { writeCachedEmbedding } from './writeCachedEmbedding.ts'

/**
 * Cache first, provider second. A lookup already in flight can be passed in
 * so it overlaps whatever preceded it; the provider is called only on a miss,
 * and only then is a vector offered back to the cache.
 */
export async function acquireEmbedding(
  principal: Principal,
  query: string,
  lookup: Promise<number[] | null> = readCachedEmbedding(principal, query),
): Promise<QueryEmbedding> {
  const cached = await lookup
  if (cached)
    return { vector: cached, source: 'cached', stored: Promise.resolve() }
  const vector = await embedQuery(query)
  if (!vector)
    return { vector: null, source: 'unavailable', stored: Promise.resolve() }
  return {
    vector,
    source: 'fresh',
    stored: writeCachedEmbedding(principal, query, vector),
  }
}
