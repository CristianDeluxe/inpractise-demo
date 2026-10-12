import { formatCount } from '@/transcripts/formatters/formatCount'
import { cleanupApiCostLabel } from './cleanupApiCostLabel'
import type { CostRow } from './CostRow'

/** The split behind the token total and what it cost at the API; undefined before the AI pass. */
export function tokensDetailLabel(row: CostRow): string | undefined {
  if (row.inputTokens === null || row.outputTokens === null) return undefined
  return `${formatCount(row.inputTokens)} in, ${formatCount(row.outputTokens)} out, ${cleanupApiCostLabel} API`
}
