import type { ChartRow } from './ChartRow'

export function rowTotal(row: ChartRow): number {
  return row.segments.reduce((total, segment) => total + segment.value, 0)
}
