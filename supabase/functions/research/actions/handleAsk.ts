import { retrieveCandidates } from '../../_shared/search/retrieveCandidates.ts'
import { assertSourcesSupplied } from '../answer/assertSourcesSupplied.ts'
import { authorisedCitationIds } from '../answer/authorisedCitationIds.ts'
import { buildAskResult } from '../answer/buildAskResult.ts'
import { debitRequest } from '../answer/debitRequest.ts'
import { embedQuery } from '../answer/embedQuery.ts'
import { generateAnswer } from '../answer/generateAnswer.ts'
import { recordUsage } from '../answer/recordUsage.ts'
import { readCitationSources } from '../citations/readCitationSources.ts'
import type { Principal } from '../Principal.ts'

/**
 * Retrieval, then one generation, then a re-read of every cited row with the
 * caller's own client. The re-read is the point: an answer whose evidence the
 * caller may no longer see is dropped rather than returned.
 */
export async function handleAsk(
  principal: Principal,
  query: string,
  company: string | undefined,
) {
  const request = await debitRequest(principal)
  const embedding = await embedQuery(query)
  const { candidates, diagnostics } = await retrieveCandidates(
    principal.client,
    {
      premium: principal.premium,
      query,
      embedding,
      ...(company === undefined ? {} : { company }),
    },
  )
  const selected = candidates.filter((candidate) =>
    diagnostics.selectedIds.includes(candidate.key),
  )
  const sources = await readCitationSources(principal, selected)
  const scope = { mode: diagnostics.mode, candidateCount: candidates.length }
  if (!sources.length)
    return {
      status: 'not_found' as const,
      claims: [],
      missingEvidence: ['No authorised passage matched this question.'],
      citations: [],
      ...scope,
    }
  const answer = await generateAnswer(query, sources, async (usage) =>
    recordUsage(principal, request, usage),
  )
  assertSourcesSupplied(answer, sources.length)
  const rechecked = await readCitationSources(principal, selected)
  return {
    ...buildAskResult(answer, sources, authorisedCitationIds(rechecked)),
    ...scope,
  }
}
