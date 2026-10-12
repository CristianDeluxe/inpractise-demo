import { claimLimitRetryNotice } from '../answer/claimLimitRetryNotice.ts'
import type { MergedEvidence } from './MergedEvidence.ts'
import type { SubQuestion } from './SubQuestion.ts'
import { synthesisTranscript } from './synthesisTranscript.ts'

/**
 * The one retry synthesis gets after a reply broke only the claim limits:
 * the same transcript, with both limits restated right before the reply is
 * requested again.
 */
export function synthesisRetryTranscript(
  question: string,
  plan: readonly SubQuestion[],
  merged: MergedEvidence,
): string {
  return synthesisTranscript(question, plan, merged) + claimLimitRetryNotice
}
