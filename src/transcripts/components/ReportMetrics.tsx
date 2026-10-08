import { formatCount } from '../formatters/formatCount'
import { formatDuration } from '../formatters/formatDuration'
import { formatPercent } from '../formatters/formatPercent'
import { countFlaggedSpans } from '../review/countFlaggedSpans'
import { countVerdicts } from '../review/countVerdicts'
import { listEdits } from '../review/listEdits'
import { relistenMinutes } from '../review/relistenMinutes'
import { relistenPaddingSeconds } from '../review/relistenPaddingSeconds'
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
  const verdicts = countVerdicts(edits, decisions)
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
          label="Edits accepted"
          value={`${formatCount(verdicts.accepted)} of ${formatCount(verdicts.total)}`}
          detail={`${formatCount(verdicts.pending)} pending, ${formatCount(verdicts.deferred)} flagged, ${formatCount(verdicts.rejected)} rejected`}
        />
        <StatCell
          label="Memory hits"
          value={formatCount(correction?.memory.glossaryHits ?? 0)}
        />
        <StatCell
          label="Audio to re-listen"
          value={`~${String(relistenMinutes(transcript))} min`}
          detail={`${String(spans)} flagged spans`}
        />
      </dl>
      <p className="meta-text mt-3">
        Audio to re-listen is computed, not timed: every low-confidence word
        that is not a filler, padded by {String(relistenPaddingSeconds)} s on
        each side, overlapping windows merged. It is the audio a reviewer would
        still replay instead of the whole episode. The text below shows accepted
        and pending edits in place; only rejected edits are reverted.
      </p>
    </section>
  )
}
