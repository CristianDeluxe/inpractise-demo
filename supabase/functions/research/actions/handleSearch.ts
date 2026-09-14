import { embedQuery } from '../answer/embedQuery.ts'
import type { Principal } from '../Principal.ts'
import { searchEvidence } from './searchEvidence.ts'

/** Acquire a query embedding, then retrieve under the caller's RLS scope. */
export async function handleSearch(
  principal: Principal,
  query: string,
  company: string | undefined,
  limit: number,
) {
  const embedding = await embedQuery(query)
  return searchEvidence(
    principal,
    { query, embedding, ...(company === undefined ? {} : { company }) },
    limit,
  )
}
