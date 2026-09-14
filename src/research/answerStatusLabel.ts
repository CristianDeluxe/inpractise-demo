import { answerStatusLabels } from './answerStatusLabels'

/**
 * The provider's status codes are a contract, not copy. Reading one back to the
 * analyst verbatim ("Not found") reads as a search failure, which is the one
 * thing this demo must never blur: the corpus was searched, and it did answer
 * the question of whether it holds the evidence.
 */
export function answerStatusLabel(status: keyof typeof answerStatusLabels) {
  return answerStatusLabels[status]
}
