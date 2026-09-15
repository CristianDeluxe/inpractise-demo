import type { AskExchange } from './AskExchange'

/** Replaces one exchange in place, leaving every other question's answer where
 * it is: answers can land while a later question is already on screen. */
export function settleExchange(
  exchanges: AskExchange[],
  id: string,
  settled: Partial<AskExchange>,
): AskExchange[] {
  return exchanges.map((exchange) =>
    exchange.id === id ? { ...exchange, ...settled } : exchange,
  )
}
