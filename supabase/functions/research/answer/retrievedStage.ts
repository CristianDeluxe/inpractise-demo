import type { AskStage } from './AskStage.ts'
import type { RetrievedStageInput } from './RetrievedStageInput.ts'

/** What retrieval found, before context selection narrows it. */
export function retrievedStage(input: RetrievedStageInput): AskStage {
  return {
    phase: 'retrieved',
    mode: input.mode,
    candidateCount: input.candidates.length,
    ...(input.detailed ? { candidateAt10: input.candidateAt10 } : {}),
  }
}
