import type { ProviderAnswer } from '../../supabase/functions/research/answer/ProviderAnswer.ts'

/** Two claims resting on two different passages, so revoking one is visible. */
export function revokedAnswerFixture(): ProviderAnswer {
  return {
    status: 'answered',
    claims: [
      { text: 'The source reports a six week migration.', sources: [1] },
      { text: 'A second claim rests on another passage.', sources: [2] },
    ],
    missingEvidence: [],
  }
}
