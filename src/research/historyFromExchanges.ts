import type { AskHistoryTurn } from '@/api/AskHistoryTurn'
import { answerBubbleText } from '@/research/answerBubbleText'
import type { AskExchange } from '@/research/AskExchange'

/** The last three answered turns, in order, as the server's rewrite prompt
 * expects them. Failed or pending questions carry no answer and are skipped. */
export function historyFromExchanges(
  exchanges: readonly AskExchange[],
): AskHistoryTurn[] {
  return exchanges
    .filter((exchange) => exchange.answer !== undefined)
    .slice(-3)
    .map((exchange) => ({
      question: exchange.question,
      answer:
        exchange.answer === undefined
          ? ''
          : answerBubbleText(exchange.answer).slice(0, 2_000),
    }))
}
