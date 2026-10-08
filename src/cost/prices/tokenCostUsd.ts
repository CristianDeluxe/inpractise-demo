import type { ModelPrice } from './ModelPrice'

/** USD at list price; undefined when the price is not confirmed. */
export function tokenCostUsd(
  price: ModelPrice | undefined,
  inputTokens: number,
  outputTokens: number,
): number | undefined {
  if (price === undefined) return undefined
  return (
    (inputTokens * price.inputUsdPerMillion +
      outputTokens * price.outputUsdPerMillion) /
    1_000_000
  )
}
