import type { MergedEvidence } from './MergedEvidence.ts'
import type { SubQuestion } from './SubQuestion.ts'
import { synthesisTranscript } from './synthesisTranscript.ts'

/**
 * The one retry synthesis gets after every claim exceeded the length cap:
 * the same transcript, with the limit restated right before the reply is
 * requested again.
 */
export function synthesisRetryTranscript(
  question: string,
  plan: readonly SubQuestion[],
  merged: MergedEvidence,
): string {
  return (
    synthesisTranscript(question, plan, merged) +
    '\n\nThe previous reply was rejected: one or more claims exceeded 500 ' +
    'characters. Rewrite every claim as a single sentence of 500 characters ' +
    'or fewer, splitting a longer point into more claims instead.'
  )
}
