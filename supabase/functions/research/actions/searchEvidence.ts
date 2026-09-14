import { retrieveCandidates } from '../../_shared/search/retrieveCandidates.ts'
import type { SearchInput } from '../../_shared/types/SearchInput.ts'
import { buildCitation } from '../citations/buildCitation.ts'
import { readCitationSources } from '../citations/readCitationSources.ts'
import type { Principal } from '../Principal.ts'

export async function searchEvidence(
  principal: Principal,
  input: SearchInput,
  limit: number,
) {
  const { candidates, diagnostics } = await retrieveCandidates(
    principal.client,
    { ...input, premium: principal.premium },
  )
  const top = candidates.slice(0, limit)
  const sources = await readCitationSources(principal, top)
  return {
    items: sources.map(buildCitation),
    mode: diagnostics.mode,
    truncated: candidates.length > top.length,
  }
}
