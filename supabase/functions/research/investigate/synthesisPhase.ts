import { authorisedCitationIds } from '../answer/authorisedCitationIds.ts'
import { recordDiagnostics } from '../answer/recordDiagnostics.ts'
import { recordUsage } from '../answer/recordUsage.ts'
import { readCitationSources } from '../citations/readCitationSources.ts'
import { buildInvestigationResult } from './buildInvestigationResult.ts'
import type { InvestigateStage } from './InvestigateStage.ts'
import type { InvestigationContext } from './InvestigationContext.ts'
import { investigationRecord } from './investigationRecord.ts'
import { investigationScope } from './investigationScope.ts'
import { mergeEvidence } from './mergeEvidence.ts'
import type { RefinementOutcome } from './RefinementOutcome.ts'
import { requestSynthesis } from './requestSynthesis.ts'
import type { SubQuestion } from './SubQuestion.ts'
import type { SubQuestionEvidence } from './SubQuestionEvidence.ts'

/**
 * Step four. The steps' evidence is merged into one context, the ledger
 * record is written best effort, and when nothing readable remains the loop
 * ends in a refusal without a provider call. Otherwise one synthesis runs,
 * its usage is recorded, and the citations are reread with the caller's
 * client before the result is assembled.
 */
export async function* synthesisPhase(
  context: InvestigationContext,
  plan: readonly SubQuestion[],
  gathered: { evidence: SubQuestionEvidence[]; refinement: RefinementOutcome },
): AsyncGenerator<
  InvestigateStage,
  ReturnType<typeof buildInvestigationResult>
> {
  const merged = mergeEvidence(gathered.evidence)
  await recordDiagnostics(
    context.principal,
    context.request,
    investigationRecord(gathered.evidence, merged),
  )
  const scope = investigationScope(context, gathered, merged)
  if (!merged.sources.length)
    return buildInvestigationResult({
      ...scope,
      synthesis: null,
      stillAuthorised: new Set<string>(),
      elapsedMs: context.clock(),
    })
  yield {
    phase: 'synthesise',
    elapsedMs: context.clock(),
    suppliedCount: merged.sources.length,
    subQuestionCount: plan.length,
  }
  const synthesis = await requestSynthesis(
    { question: context.question, plan, merged },
    context.budget,
    async (totals) => recordUsage(context.principal, context.request, totals),
  )
  const rechecked = await readCitationSources(
    context.principal,
    merged.candidates,
  )
  return buildInvestigationResult({
    ...scope,
    synthesis,
    stillAuthorised: authorisedCitationIds(rechecked),
    elapsedMs: context.clock(),
  })
}
