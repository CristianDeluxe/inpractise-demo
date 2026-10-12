import { formatWordCount } from '@/transcripts/formatters/formatWordCount'
import type { CostRow } from './CostRow'

export function spotCheckWordsLabel(row: CostRow): string | undefined {
  if (row.reliability === null) return undefined
  return `${formatWordCount(row.reliability.spotCheckWords)} to spot-check`
}
