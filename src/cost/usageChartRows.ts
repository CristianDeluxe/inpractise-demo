import { formatCount } from '@/transcripts/formatters/formatCount'
import type { ChartRow } from './charts/ChartRow'
import { costLabel } from './costLabel'
import type { UsageDay } from './UsageDay'
import { usageDayCostUsd } from './usageDayCostUsd'

export function usageChartRows(days: readonly UsageDay[]): ChartRow[] {
  return days.map((day) => ({
    key: day.day,
    label: day.day,
    segments: [
      { value: day.inputTokens, tone: 'primary' },
      { value: day.outputTokens, tone: 'steel' },
    ],
    text: `${formatCount(day.totalTokens)} tokens, ${costLabel(usageDayCostUsd(day))}, ${formatCount(day.requests)} requests`,
  }))
}
