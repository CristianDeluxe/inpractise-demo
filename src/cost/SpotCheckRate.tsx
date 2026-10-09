import { BarChart } from './charts/BarChart'
import type { CostRowsProps } from './CostRowsProps'
import { reviewerChartRows } from './reviewerChartRows'

/** The chart once any episode has a measurement; one sentence until then. */
export function SpotCheckRate({ rows }: CostRowsProps) {
  if (rows.every((row) => row.minutesPerAudioHour === undefined))
    return (
      <p className="mt-6 text-sm text-muted-foreground">
        Optional spot-check minutes per audio hour: not measured yet. They
        appear here once a person has checked some edits.
      </p>
    )
  return (
    <BarChart
      caption="Optional spot-check minutes per audio hour (estimated from decision timestamps)"
      rows={reviewerChartRows(rows)}
    />
  )
}
