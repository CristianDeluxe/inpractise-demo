import { formatCount } from '../formatters/formatCount'
import { formatDuration } from '../formatters/formatDuration'
import { formatReliability } from '../formatters/formatReliability'
import { reliabilityDefinition } from './reliabilityDefinition'
import type { ReportMetricsProps } from './ReportMetricsProps'
import { StatCell } from './StatCell'

export function ReportMetrics({
  transcript,
  correction,
  summary,
}: ReportMetricsProps) {
  const { edits } = summary
  return (
    <section aria-labelledby="report-metrics" className="mt-10">
      <h2 id="report-metrics" className="text-xl">
        Summary
      </h2>
      <dl className="mt-4 grid grid-cols-2 border-l border-t border-border md:grid-cols-3 print:border-black">
        <StatCell
          label="Duration"
          value={formatDuration(transcript.source.durationSeconds)}
        />
        <StatCell label="Words" value={formatCount(summary.words)} />
        <StatCell
          label="AI-final reliability"
          value={formatReliability(summary.reliability)}
          detail={`${formatCount(summary.reliableWords)} reliable words`}
        />
        <StatCell
          label="Words to spot-check"
          value={formatCount(summary.spotCheckWords)}
          detail="Optional; below the reliable threshold"
        />
        <StatCell
          label="Edits applied"
          value={formatCount(edits.auto + edits.accepted)}
          detail={`${formatCount(edits.auto)} automatic, ${formatCount(edits.accepted)} confirmed by a person`}
        />
        <StatCell
          label="Edits left uncertain"
          value={formatCount(edits.uncertain)}
          detail={`Not applied; ${formatCount(edits.rejected)} reverted by a person`}
        />
        <StatCell
          label="Memory hits"
          value={formatCount(correction?.memory.glossaryHits ?? 0)}
        />
      </dl>
      <p className="mt-3 text-sm text-muted-foreground print:text-black">
        {reliabilityDefinition()}
      </p>
    </section>
  )
}
