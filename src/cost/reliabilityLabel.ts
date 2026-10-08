import { formatReliability } from '@/transcripts/formatters/formatReliability'
import { formatWordCount } from '@/transcripts/formatters/formatWordCount'
import type { CostRow } from './CostRow'
import { noAiPassLabel } from './noAiPassLabel'

export function reliabilityLabel(row: CostRow): string {
  if (row.reliability === null) return noAiPassLabel
  return `${formatReliability(row.reliability.reliability)}, ${formatWordCount(row.reliability.spotCheckWords)} to spot-check`
}
