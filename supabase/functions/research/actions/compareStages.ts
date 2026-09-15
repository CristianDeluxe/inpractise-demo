import { authorisedCitationIds } from '../answer/authorisedCitationIds.ts'
import { debitRequest } from '../answer/debitRequest.ts'
import { embedQuery } from '../answer/embedQuery.ts'
import { recordDiagnostics } from '../answer/recordDiagnostics.ts'
import { recordUsage } from '../answer/recordUsage.ts'
import { readCitationSources } from '../citations/readCitationSources.ts'
import { assertComparisonGrounded } from '../compare/assertComparisonGrounded.ts'
import { buildComparison } from '../compare/buildComparison.ts'
import type { CompareInput } from '../compare/CompareInput.ts'
import type { CompareStage } from '../compare/CompareStage.ts'
import { generateComparison } from '../compare/generateComparison.ts'
import { retrieveSides } from '../compare/retrieveSides.ts'
import { sidesDiagnostics } from '../compare/sidesDiagnostics.ts'
import { uncoveredComparison } from '../compare/uncoveredComparison.ts'
import { uncoveredSides } from '../compare/uncoveredSides.ts'
import type { Principal } from '../Principal.ts'

/**
 * The cross-reference pipeline as observable phases, in the answer's order:
 * one debit, retrieval measured per side before selection, one generation
 * over both sides, then the authorization recheck that alone releases claims,
 * quotations and citations. A side with no readable passage ends the pipeline
 * before the provider is called, and the result says which side it was.
 */
export async function* compareStages(
  principal: Principal,
  input: CompareInput,
) {
  const request = await debitRequest(principal)
  yield { phase: 'debited' } as CompareStage
  const sides = await retrieveSides(
    principal,
    input,
    await embedQuery(input.topic),
  )
  const { interviews, filings } = sides
  yield {
    phase: 'retrieved',
    mode: interviews.mode,
    interviewCandidates: interviews.candidates.length,
    filingCandidates: filings.candidates.length,
  } as CompareStage
  await recordDiagnostics(principal, request, sidesDiagnostics(sides))
  yield {
    phase: 'selected',
    interviewCount: interviews.sources.length,
    filingCount: filings.sources.length,
    selectedTokens:
      interviews.record.selectedTokens + filings.record.selectedTokens,
  } as CompareStage
  const scope = { ...input, mode: interviews.mode }
  const uncovered = uncoveredSides(sides)
  if (uncovered.length) return uncoveredComparison(scope, sides, uncovered)
  const suppliedCount = interviews.sources.length + filings.sources.length
  yield { phase: 'generating', suppliedCount } as CompareStage
  const comparison = await generateComparison(
    input.topic,
    { interviews: interviews.sources, filings: filings.sources },
    async (usage) => recordUsage(principal, request, usage),
  )
  assertComparisonGrounded(comparison, interviews.sources, filings.sources)
  yield { phase: 'verifying', citationCount: suppliedCount } as CompareStage
  const rechecked = await readCitationSources(principal, [
    ...interviews.selected,
    ...filings.selected,
  ])
  return buildComparison(
    comparison,
    sides,
    authorisedCitationIds(rechecked),
    scope,
  )
}
