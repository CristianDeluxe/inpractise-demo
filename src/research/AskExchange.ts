import type { Answer } from '@/contracts/Answer'

/**
 * One question and what came back for it. Each exchange is retrieved on its own:
 * an earlier question never becomes context for a later one, so the transcript
 * is a record of what was asked, not a conversation the model reads back.
 */
export type AskExchange = {
  id: string
  question: string
  answer: Answer | undefined
  failure: string | undefined
}
