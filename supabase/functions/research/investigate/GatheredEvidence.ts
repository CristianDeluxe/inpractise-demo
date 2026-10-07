import type { RefinementOutcome } from './RefinementOutcome.ts'
import type { SubQuestionEvidence } from './SubQuestionEvidence.ts'

/** What retrieval found for every sub-question, and how refinement ended. */
export type GatheredEvidence = {
  evidence: SubQuestionEvidence[]
  refinement: RefinementOutcome
}
