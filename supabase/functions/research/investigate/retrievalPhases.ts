import type { InvestigateStage } from './InvestigateStage.ts'
import { investigateSubQuestion } from './investigateSubQuestion.ts'
import type { InvestigationContext } from './InvestigationContext.ts'
import { refineInvestigation } from './refineInvestigation.ts'
import type { RefinementOutcome } from './RefinementOutcome.ts'
import type { SubQuestion } from './SubQuestion.ts'
import type { SubQuestionEvidence } from './SubQuestionEvidence.ts'
import { summariseRetrieval } from './summariseRetrieval.ts'

/**
 * Steps two and three: one retrieval per planned sub-question, reported as
 * it completes, then at most one refinement, which replaces its sub-question's
 * evidence in place and is reported the same way.
 */
export async function* retrievalPhases(
  context: InvestigationContext,
  plan: readonly SubQuestion[],
): AsyncGenerator<
  InvestigateStage,
  { evidence: SubQuestionEvidence[]; refinement: RefinementOutcome }
> {
  const evidence: SubQuestionEvidence[] = []
  for (const subQuestion of plan) {
    const found = await investigateSubQuestion(context.principal, subQuestion)
    evidence.push(found)
    yield {
      phase: 'retrieve',
      step: subQuestion.index,
      elapsedMs: context.clock(),
      ...summariseRetrieval(found, context.detailed),
    }
  }
  const refined = await refineInvestigation(
    context.principal,
    context.question,
    evidence,
    context.budget,
  )
  if (refined.evidence) {
    const step = refined.evidence.subQuestion.index
    evidence[step - 1] = refined.evidence
    yield {
      phase: 'refine',
      step,
      elapsedMs: context.clock(),
      question: refined.evidence.subQuestion.question,
      ...summariseRetrieval(refined.evidence, context.detailed),
    }
  }
  return { evidence, refinement: refined.outcome }
}
