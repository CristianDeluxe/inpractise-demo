import type { TokenBudget } from './TokenBudget.ts'

/** The usage callback for a call whose tokens count against the budget but
 * are not yet recorded: the ledger takes one total, with the synthesis. */
export function budgetUsageSink(
  budget: TokenBudget,
): (usage: unknown) => Promise<void> {
  return async (usage) => {
    budget.consume(usage)
    await Promise.resolve()
  }
}
