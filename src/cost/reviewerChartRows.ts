import type { ChartRow } from './charts/ChartRow'
import type { CostRow } from './CostRow'
import { formatReviewerMinutes } from './formatters/formatReviewerMinutes'
import { notMeasuredLabel } from './notMeasuredLabel'

export function reviewerChartRows(rows: readonly CostRow[]): ChartRow[] {
  return rows.map((row) => {
    const minutes = row.minutesPerAudioHour
    return {
      key: row.id,
      label: row.title,
      segments:
        minutes === undefined ? [] : [{ value: minutes, tone: 'steel' }],
      text:
        minutes === undefined
          ? notMeasuredLabel
          : `${formatReviewerMinutes(minutes)} per audio hour`,
    }
  })
}
