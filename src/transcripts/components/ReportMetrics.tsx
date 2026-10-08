import { formatCount } from '../formatters/formatCount'
import { formatDuration } from '../formatters/formatDuration'
import { formatPercent } from '../formatters/formatPercent'
import { countApplied } from '../review/countApplied'
import { countFlaggedSpans } from '../review/countFlaggedSpans'
import { estimateReviewMinutes } from '../review/estimateReviewMinutes'
import { listEdits } from '../review/listEdits'
import { reviewSecondsPerSpan } from '../review/reviewSecondsPerSpan'
import type { ReportMetricsProps } from './ReportMetricsProps'
import { StatCell } from './StatCell'

export function ReportMetrics({
  transcript,
  correction,
  decisions,
}: ReportMetricsProps) {
  const { stats, source } = transcript
  const edits = listEdits(correction)
  const spans = countFlaggedSpans(transcript)
  return (
    <section aria-labelledby="report-metrics" className="mt-10">
      <h2 id="report-metrics" className="text-xl">
        Summary
      </h2>
      <dl className="mt-4 grid grid-cols-2 border-l border-t border-border md:grid-cols-3 print:border-black">
        <StatCell
          label="Duration"
          value={formatDuration(source.durationSeconds)}
        />
        <StatCell label="Words" value={formatCount(stats.words)} />
        <StatCell
          label="Flagged"
          value={formatPercent(stats.low, stats.words)}
          detail={`${formatCount(stats.low)} low-confidence words`}
        />
        <StatCell
          label="Edits applied"
          value={`${formatCount(countApplied(edits, decisions))} of ${formatCount(edits.length)}`}
        />
        <StatCell
          label="Memory hits"
          value={formatCount(correction?.memory.glossaryHits ?? 0)}
        />
        <StatCell
          label="Reviewer time (estimate)"
          value={`~${String(estimateReviewMinutes(spans))} min`}
          detail={`${String(spans)} flagged spans x ${String(reviewSecondsPerSpan)} s`}
        />
      </dl>
      <p className="meta-text mt-3">
        The reviewer-time figure is an estimate, not a measurement: flagged
        spans (runs of consecutive low-confidence words) times{' '}
        {String(reviewSecondsPerSpan)} seconds each, rounded to whole minutes.
      </p>
    </section>
  )
}
