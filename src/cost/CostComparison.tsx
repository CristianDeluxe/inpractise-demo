import type { CostComparisonProps } from './CostComparisonProps'
import { formatReviewerMinutes } from './formatters/formatReviewerMinutes'
import { manualBaselineText } from './manualBaselineText'
import { notMeasuredLabel } from './notMeasuredLabel'
import { totalMinutesPerAudioHour } from './totalMinutesPerAudioHour'

export function CostComparison({ rows }: CostComparisonProps) {
  const measured = totalMinutesPerAudioHour(rows)
  return (
    <dl className="mt-8 grid gap-4 md:grid-cols-2">
      <div className="metric">
        <dt>This pipeline: reviewer minutes per audio hour</dt>
        <dd>
          {measured === undefined
            ? notMeasuredLabel
            : formatReviewerMinutes(measured)}
        </dd>
      </div>
      <div className="metric">
        <dt>Baseline</dt>
        <dd>{manualBaselineText}</dd>
      </div>
    </dl>
  )
}
