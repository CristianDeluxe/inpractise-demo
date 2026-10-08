import type { ChartRow } from './ChartRow'
import { rowTotal } from './rowTotal'

export function chartMaximum(rows: readonly ChartRow[]): number {
  return Math.max(0, ...rows.map(rowTotal))
}
