import type { Principal } from '../Principal.ts'
import { acquireEmbedding } from './acquireEmbedding.ts'
import { answerScope } from './answerScope.ts'
import type { AskStage } from './AskStage.ts'
import { debitAndResolve } from './debitAndResolve.ts'
import { evidenceVintage } from './evidenceVintage.ts'
import { recordSelection } from './recordSelection.ts'
import type { ResolveAndSelectInput } from './ResolveAndSelectInput.ts'
import { retrievedStage } from './retrievedStage.ts'
import { retrieveForQuery } from './retrieveForQuery.ts'
import { selectedStage } from './selectedStage.ts'

/**
 * The half of the answer pipeline that settles on the passages the model will
 * see: debit, resolution, retrieval and context selection, each yielded as
 * its own timed stage. Split out so the generation half stays readable, and
 * delegated into with `yield*`, whose value is this generator's return.
 */
export async function* resolveAndSelectStages(
  principal: Principal,
  input: ResolveAndSelectInput,
) {
  const { request, resolvedQuery } = await debitAndResolve(
    principal,
    input.query,
    input.history,
  )
  yield { phase: 'debited', elapsedMs: input.elapsed() } as AskStage
  const embedding = await acquireEmbedding(principal, resolvedQuery)
  const { candidates, diagnostics } = await retrieveForQuery(
    principal,
    resolvedQuery,
    input.company,
    embedding.vector,
  )
  yield retrievedStage({
    ...diagnostics,
    candidates,
    detailed: input.detailed,
    elapsedMs: input.elapsed(),
  })
  const { selected, sources, record } = await recordSelection(principal, {
    request,
    candidates,
    selectedIds: diagnostics.selectedIds,
    embeddingStored: embedding.stored,
  })
  yield selectedStage({
    selectedCount: selected.length,
    suppliedCount: sources.length,
    selectedTokens: record.selectedTokens,
    selectedIds: record.selectedIds,
    detailed: input.detailed,
    elapsedMs: input.elapsed(),
  })
  const scope = answerScope({
    mode: diagnostics.mode,
    candidateCount: candidates.length,
    vintage: evidenceVintage(sources, new Date()),
    record,
    detailed: input.detailed,
  })
  return { request, resolvedQuery, sources, selected, scope }
}
