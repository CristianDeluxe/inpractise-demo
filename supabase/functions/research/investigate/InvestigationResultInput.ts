import type { evidenceVintage } from '../answer/evidenceVintage.ts'
import type { MergedEvidence } from './MergedEvidence.ts'
import type { RefinementOutcome } from './RefinementOutcome.ts'
import type { SubQuestionEvidence } from './SubQuestionEvidence.ts'
import type { Synthesis } from './Synthesis.ts'

export type InvestigationResultInput = {
  question: string
  evidence: readonly SubQuestionEvidence[]
  merged: MergedEvidence
  synthesis: Synthesis | null
  stillAuthorised: ReadonlySet<string>
  refinement: RefinementOutcome
  vintage: ReturnType<typeof evidenceVintage>
  elapsedMs: number
  detailed: boolean
}
