import { retrieveCandidates } from '../../_shared/search/retrieveCandidates.ts'
import type { Principal } from '../Principal.ts'

/** Retrieval under the caller's own client, scoped by their effective tier. */
export async function retrieveForQuery(
  principal: Principal,
  query: string,
  company: string | undefined,
  embedding: number[] | null,
) {
  return await retrieveCandidates(principal.client, {
    premium: principal.premium,
    query,
    embedding,
    ...(company === undefined ? {} : { company }),
  })
}
