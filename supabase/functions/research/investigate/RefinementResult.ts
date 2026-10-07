import type { RefinementOutcome } from './RefinementOutcome.ts'
import type { SubQuestionEvidence } from './SubQuestionEvidence.ts'

/** How refinement ended, with the replacement evidence when it applied. */
export type RefinementResult = {
  outcome: RefinementOutcome
  evidence?: SubQuestionEvidence
}
