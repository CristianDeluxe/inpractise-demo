import type { AskHistoryTurn } from '../answer/AskHistoryTurn.ts'
import type { AskStage } from '../answer/AskStage.ts'
import { assertSourcesSupplied } from '../answer/assertSourcesSupplied.ts'
import { authorisedCitationIds } from '../answer/authorisedCitationIds.ts'
import { buildAskResult } from '../answer/buildAskResult.ts'
import { elapsedTimer } from '../answer/elapsedTimer.ts'
import { generateAnswer } from '../answer/generateAnswer.ts'
import { mayReadDiagnostics } from '../answer/mayReadDiagnostics.ts'
import { noSourcesAnswer } from '../answer/noSourcesAnswer.ts'
import { recordUsage } from '../answer/recordUsage.ts'
import { resolveAndSelectStages } from '../answer/resolveAndSelectStages.ts'
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
 * Each stage carries how long its own phase took on the server. Resolution,
 * retrieval and selection are delegated to `resolveAndSelectStages`.
 */
export async function* askStages(
  principal: Principal,
  query: string,
  company: string | undefined,
  history: readonly AskHistoryTurn[] = [],
) {
  const elapsed = elapsedTimer()
  const { request, resolvedQuery, sources, selected, scope } =
    yield* resolveAndSelectStages(principal, {
      query,
      company,
      history,
      detailed: mayReadDiagnostics(principal),
      elapsed,
    })
  if (!sources.length) return { ...noSourcesAnswer(scope), resolvedQuery }
  yield {
    phase: 'generating',
    suppliedCount: sources.length,
    elapsedMs: elapsed(),
  } as AskStage
  const answer = await generateAnswer(resolvedQuery, sources, async (usage) =>
    recordUsage(principal, request, usage),
  )
  assertSourcesSupplied(answer, sources.length)
  yield {
    phase: 'verifying',
    citationCount: selected.length,
    elapsedMs: elapsed(),
  } as AskStage
  const rechecked = await readCitationSources(principal, selected)
  return {
    ...buildAskResult(answer, sources, authorisedCitationIds(rechecked)),
    ...scope,
    resolvedQuery,
  }
}
