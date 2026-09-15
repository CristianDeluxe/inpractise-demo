import type { Answer } from '@/contracts/Answer'
import { notFoundExplanation } from './notFoundExplanation'

/** What the answer says, in the chat's voice: the claims as the model made
 * them, or the reason the corpus established nothing. Never both. */
export function answerBubbleText(answer: Answer): string {
  return answer.status === 'not_found'
    ? notFoundExplanation(answer.candidateCount)
    : answer.claims.map((claim) => claim.text).join('\n\n')
}
