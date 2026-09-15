import { evidenceVintage } from '../answer/evidenceVintage.ts'
import type { InvestigationContext } from './InvestigationContext.ts'
import type { MergedEvidence } from './MergedEvidence.ts'
import type { RefinementOutcome } from './RefinementOutcome.ts'
import type { SubQuestionEvidence } from './SubQuestionEvidence.ts'

/** The part of the result that is settled before synthesis: what was asked,
 * what every step found, what was merged, and how old the evidence is. */
export function investigationScope(
  context: InvestigationContext,
  gathered: { evidence: SubQuestionEvidence[]; refinement: RefinementOutcome },
  merged: MergedEvidence,
) {
  return {
    question: context.question,
    evidence: gathered.evidence,
    merged,
    refinement: gathered.refinement,
    vintage: evidenceVintage(merged.sources, new Date()),
    detailed: context.detailed,
  }
}
