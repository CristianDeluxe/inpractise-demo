import type { MergedEvidence } from './MergedEvidence.ts'
import type { SubQuestion } from './SubQuestion.ts'

/** What one synthesis is asked over. */
export type SynthesisInput = {
  question: string
  plan: readonly SubQuestion[]
  merged: MergedEvidence
}
