import type { Principal } from '../Principal.ts'
import { embeddingModel } from './embeddingModel.ts'
import { queryCacheKey } from './queryCacheKey.ts'

/**
 * Best effort: a duplicate key from a concurrent asker, a missing table or a
 * refused insert leaves the cache as it was and the answer unaffected.
 */
export async function writeCachedEmbedding(
  principal: Principal,
  query: string,
  vector: readonly number[],
): Promise<void> {
  try {
    await principal.client.from('query_embeddings').insert({
      cache_key: await queryCacheKey(query),
      model: embeddingModel,
      embedding: JSON.stringify(vector),
    })
  } catch {
    return
  }
}
