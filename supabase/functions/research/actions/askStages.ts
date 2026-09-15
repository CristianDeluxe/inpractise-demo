import { answerScope } from '../answer/answerScope.ts'
import type { AskHistoryTurn } from '../answer/AskHistoryTurn.ts'
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
import { resolveQuery } from '../answer/resolveQuery.ts'
import { retrievalDiagnostics } from '../answer/retrievalDiagnostics.ts'
import { retrievedStage } from '../answer/retrievedStage.ts'
import { retrieveForQuery } from '../answer/retrieveForQuery.ts'
import { selectedCandidates } from '../answer/selectedCandidates.ts'
import { readCitationSources } from '../citations/readCitationSources.ts'
import type { Principal } from '../Principal.ts'

/**
 * The answer pipeline as a sequence of observable phases. The order is the
 * order that matters: recall is measured before context selection, and the
 * authorization recheck happens after generation, so the terminal value is the
 * only thing that carries evidence. Per-candidate identifiers are yielded only
 * to a principal the endpoint already discloses them to. A follow-up is first
 * rewritten into the standalone question that every later phase measures, and
 * that question is returned with the answer so the rewrite is inspectable.
 */
export async function* askStages(
  principal: Principal,
  query: string,
  company: string | undefined,
  history: readonly AskHistoryTurn[] = [],
) {
  const detailed = mayReadDiagnostics(principal)
  const request = await debitRequest(principal)
  yield { phase: 'debited' } as AskStage
  const resolvedQuery = await resolveQuery(query, history)
  const embedding = await embedQuery(resolvedQuery)
  const { candidates, diagnostics } = await retrieveForQuery(
    principal,
    resolvedQuery,
    company,
    embedding,
  )
  yield retrievedStage({ ...diagnostics, candidates, detailed })
  const selected = selectedCandidates(candidates, diagnostics.selectedIds)
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
  if (!sources.length) return { ...noSourcesAnswer(scope), resolvedQuery }
  yield { phase: 'generating', suppliedCount: sources.length } as AskStage
  const answer = await generateAnswer(resolvedQuery, sources, async (usage) =>
    recordUsage(principal, request, usage),
  )
  assertSourcesSupplied(answer, sources.length)
  yield { phase: 'verifying', citationCount: selected.length } as AskStage
  const rechecked = await readCitationSources(principal, selected)
  return {
    ...buildAskResult(answer, sources, authorisedCitationIds(rechecked)),
    ...scope,
    resolvedQuery,
  }
}
