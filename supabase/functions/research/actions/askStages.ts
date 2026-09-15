import { answerScope } from '../answer/answerScope.ts'
import type { AskStage } from '../answer/AskStage.ts'
import { assertSourcesSupplied } from '../answer/assertSourcesSupplied.ts'
import { authorisedCitationIds } from '../answer/authorisedCitationIds.ts'
import { buildAskResult } from '../answer/buildAskResult.ts'
import { debitRequest } from '../answer/debitRequest.ts'
import { embedQuery } from '../answer/embedQuery.ts'
import { evidenceVintage } from '../answer/evidenceVintage.ts'
import { generateAnswer } from '../answer/generateAnswer.ts'
import { mayReadDiagnostics } from '../answer/mayReadDiagnostics.ts'
import { noSourcesAnswer } from '../answer/noSourcesAnswer.ts'
import { recordDiagnostics } from '../answer/recordDiagnostics.ts'
import { recordUsage } from '../answer/recordUsage.ts'
import { retrievalDiagnostics } from '../answer/retrievalDiagnostics.ts'
import { retrievedStage } from '../answer/retrievedStage.ts'
import { retrieveForQuery } from '../answer/retrieveForQuery.ts'
import { readCitationSources } from '../citations/readCitationSources.ts'
import type { Principal } from '../Principal.ts'

/**
 * The answer pipeline as a sequence of observable phases. The order is the
 * order that matters: recall is measured before context selection, and the
 * authorization recheck happens after generation, so the terminal value is the
 * only thing that carries evidence. Per-candidate identifiers are yielded only
 * to a principal the endpoint already discloses them to.
 */
export async function* askStages(
  principal: Principal,
  query: string,
  company: string | undefined,
) {
  const detailed = mayReadDiagnostics(principal)
  const request = await debitRequest(principal)
  yield { phase: 'debited' } as AskStage
  const embedding = await embedQuery(query)
  const { candidates, diagnostics } = await retrieveForQuery(
    principal,
    query,
    company,
    embedding,
  )
  yield retrievedStage({ ...diagnostics, candidates, detailed })
  const selected = candidates.filter((candidate) =>
    diagnostics.selectedIds.includes(candidate.key),
  )
  const sources = await readCitationSources(principal, selected)
  const record = retrievalDiagnostics(candidates, selected)
  await recordDiagnostics(principal, request, record)
  yield {
    phase: 'selected',
    selectedCount: selected.length,
    suppliedCount: sources.length,
    selectedTokens: record.selectedTokens,
    ...(detailed ? { selectedIds: record.selectedIds } : {}),
  } as AskStage
  const scope = answerScope({
    mode: diagnostics.mode,
    candidateCount: candidates.length,
    vintage: evidenceVintage(sources, new Date()),
    record,
    detailed,
  })
  if (!sources.length) return noSourcesAnswer(scope)
  yield { phase: 'generating', suppliedCount: sources.length } as AskStage
  const answer = await generateAnswer(query, sources, async (usage) =>
    recordUsage(principal, request, usage),
  )
  assertSourcesSupplied(answer, sources.length)
  yield { phase: 'verifying', citationCount: selected.length } as AskStage
  const rechecked = await readCitationSources(principal, selected)
  return {
    ...buildAskResult(answer, sources, authorisedCitationIds(rechecked)),
    ...scope,
  }
}
