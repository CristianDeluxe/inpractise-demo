import { retrieveCandidates } from '../../_shared/search/retrieveCandidates.ts'
import { embedQuery } from '../answer/embedQuery.ts'
import { buildCitation } from '../citations/buildCitation.ts'
import { readCitationSources } from '../citations/readCitationSources.ts'
import type { Principal } from '../Principal.ts'

/**
 * The reported mode is the mode that actually ran: if the embedding call failed,
 * this says lexical_only rather than claiming a hybrid search happened.
 */
export async function handleSearch(
  principal: Principal,
  query: string,
  company: string | undefined,
  limit: number,
) {
  const embedding = await embedQuery(query)
  const { candidates, diagnostics } = await retrieveCandidates(
    principal.client,
    { query, embedding, ...(company === undefined ? {} : { company }) },
  )
  const top = candidates.slice(0, limit)
  const sources = await readCitationSources(principal, top)
  return {
    items: sources.map(buildCitation),
    mode: diagnostics.mode,
    truncated: candidates.length > top.length,
  }
}
