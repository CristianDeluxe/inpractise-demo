import type { Principal } from '../Principal.ts'
import { parseStoredVector } from './parseStoredVector.ts'
import { queryCacheKey } from './queryCacheKey.ts'

/**
 * A cache read under the caller's own client. Any failure, including a table
 * the database does not have yet, is a miss: the cache only ever saves a
 * provider call, it never decides whether the question can be answered.
 */
export async function readCachedEmbedding(
  principal: Principal,
  query: string,
): Promise<number[] | null> {
  try {
    const result = await principal.client
      .from('query_embeddings')
      .select('embedding')
      .eq('cache_key', await queryCacheKey(query))
      .limit(1)
    if (result.error) return null
    return parseStoredVector(result.data[0]?.embedding)
  } catch {
    return null
  }
}
