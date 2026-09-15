import type { Answer } from '@/contracts/Answer'

/**
 * One question and what came back for it. Earlier exchanges are sent with a
 * follow-up only so the server can rewrite it into a standalone question; the
 * answer carries that rewrite, so the transcript shows what was actually asked
 * of the corpus.
 */
export type AskExchange = {
  id: string
  question: string
  answer: Answer | undefined
  failure: string | undefined
}
