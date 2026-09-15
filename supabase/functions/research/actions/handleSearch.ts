import { acquireEmbedding } from '../answer/acquireEmbedding.ts'
import type { Principal } from '../Principal.ts'
import { searchEvidence } from './searchEvidence.ts'

/**
 * Acquire a query embedding, cached or fresh, then retrieve under the caller's
 * RLS scope. A fresh vector is offered to the cache while retrieval runs.
 */
export async function handleSearch(
  principal: Principal,
  query: string,
  company: string | undefined,
  limit: number,
) {
  const embedding = await acquireEmbedding(principal, query)
  const [result] = await Promise.all([
    searchEvidence(
      principal,
      {
        query,
        embedding: embedding.vector,
        ...(company === undefined ? {} : { company }),
      },
      limit,
    ),
    embedding.stored,
  ])
  return result
}
