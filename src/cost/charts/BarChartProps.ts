import type { ChartRow } from './ChartRow'
import type { LegendItem } from './LegendItem'

export type BarChartProps = {
  readonly caption: string
  readonly rows: readonly ChartRow[]
  readonly legend?: readonly LegendItem[]
}
