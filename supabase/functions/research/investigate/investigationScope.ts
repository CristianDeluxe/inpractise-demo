import { evidenceVintage } from '../answer/evidenceVintage.ts'
import type { GatheredEvidence } from './GatheredEvidence.ts'
import type { InvestigationContext } from './InvestigationContext.ts'
import type { MergedEvidence } from './MergedEvidence.ts'

/** The part of the result that is settled before synthesis: what was asked,
 * what every step found, what was merged, and how old the evidence is. */
export function investigationScope(
  context: InvestigationContext,
  gathered: GatheredEvidence,
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
