import type { ChartRow } from './charts/ChartRow'
import type { CostRow } from './CostRow'
import { reliabilityLabel } from './reliabilityLabel'

export function reliabilityChartRows(rows: readonly CostRow[]): ChartRow[] {
  return rows.map((row) => ({
    key: row.id,
    label: row.title,
    segments:
      row.reliability === null
        ? []
        : [{ value: row.reliability.reliability * 100, tone: 'primary' }],
    text: reliabilityLabel(row),
  }))
}
