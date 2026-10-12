import { formatReliability } from '@/transcripts/formatters/formatReliability'
import type { CostRow } from './CostRow'
import { noAiPassLabel } from './noAiPassLabel'

export function reliabilityLabel(row: CostRow): string {
  if (row.reliability === null) return noAiPassLabel
  return formatReliability(row.reliability.reliability)
}
