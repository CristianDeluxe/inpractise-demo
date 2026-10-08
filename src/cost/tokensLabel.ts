import { formatCount } from '@/transcripts/formatters/formatCount'
import type { CostRow } from './CostRow'
import { noAiPassLabel } from './noAiPassLabel'

export function tokensLabel(row: CostRow): string {
  if (row.inputTokens === null || row.outputTokens === null)
    return noAiPassLabel
  return `${formatCount(row.inputTokens)} in, ${formatCount(row.outputTokens)} out`
}
