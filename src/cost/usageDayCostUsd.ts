import { gpt41MiniPrice } from './prices/gpt41MiniPrice'
import { tokenCostUsd } from './prices/tokenCostUsd'
import type { UsageDay } from './UsageDay'

/**
 * The usage ledger does not record which model answered, so every token is
 * priced as the answer model, gpt-4.1-mini. An estimate.
 */
export function usageDayCostUsd(day: UsageDay): number | undefined {
  return tokenCostUsd(gpt41MiniPrice, day.inputTokens, day.outputTokens)
}
