import type { CitationSource } from '../citations/CitationSource.ts'
import { budgetUsageSink } from '../investigate/budgetUsageSink.ts'
import { TokenBudget } from '../investigate/TokenBudget.ts'
import { claimLimitRetryNotice } from './claimLimitRetryNotice.ts'
import { claimLimitsOnly } from './claimLimitsOnly.ts'
import { parseProviderAnswer } from './parseProviderAnswer.ts'
import type { ProviderAnswer } from './ProviderAnswer.ts'
import { requestCompletion } from './requestCompletion.ts'

/**
 * Generates one grounded answer and validates it against its schema, with one
 * bounded retry when the only failures are the claim limits. The ledger takes
 * one write per request, so `onUsage` runs exactly once, with the total of
 * every call, before the final content is parsed.
 */
export async function generateAnswer(
  query: string,
  sources: readonly CitationSource[],
  onUsage: (usage: unknown) => Promise<void>,
): Promise<ProviderAnswer> {
  const usage = new TokenBudget(Number.POSITIVE_INFINITY)
  const sink = budgetUsageSink(usage)
  const content = await requestCompletion(query, sources, sink)
  if (!claimLimitsOnly(content)) {
    await onUsage(usage.totals())
    return parseProviderAnswer(content)
  }
  const retried = await requestCompletion(
    query,
    sources,
    sink,
    claimLimitRetryNotice,
  )
  await onUsage(usage.totals())
  return parseProviderAnswer(retried)
}
