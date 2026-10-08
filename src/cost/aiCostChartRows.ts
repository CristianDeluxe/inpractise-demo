import { aiCostPerAudioHour } from './aiCostPerAudioHour'
import { aiCostText } from './aiCostText'
import type { ChartRow } from './charts/ChartRow'
import type { CostRow } from './CostRow'

export function aiCostChartRows(rows: readonly CostRow[]): ChartRow[] {
  return rows.map((row) => {
    const perHour = aiCostPerAudioHour(row)
    return {
      key: row.id,
      label: row.title,
      segments:
        perHour === undefined ? [] : [{ value: perHour, tone: 'primary' }],
      text: aiCostText(row, perHour),
    }
  })
}
