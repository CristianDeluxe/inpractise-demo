import { formatCount } from '../formatters/formatCount'
import { formatDuration } from '../formatters/formatDuration'
import { formatPercent } from '../formatters/formatPercent'
import { relistenMinutes } from '../review/relistenMinutes'
import { ReviewFact } from './ReviewFact'
import type { ReviewFactsProps } from './ReviewFactsProps'

/** The figures behind the headline, once each, against the length of the episode. */
export function ReviewFacts({ transcript, reliability }: ReviewFactsProps) {
  const { stats, source } = transcript
  const minutes = relistenMinutes(transcript)
  return (
    <dl
      aria-label="Transcript figures"
      className="lab-card divide-y divide-border text-sm"
    >
      {reliability === null ? null : (
        <>
          <ReviewFact
            label="Edits applied"
            value={formatCount(
              reliability.edits.auto + reliability.edits.accepted,
            )}
          />
          <ReviewFact
            label="Edits left uncertain"
            value={formatCount(reliability.edits.uncertain)}
          />
        </>
      )}
      <ReviewFact
        label="Optional spot-check audio"
        value={`~${String(minutes)} min (${formatPercent(minutes * 60, source.durationSeconds)})`}
      />
      <ReviewFact
        label="Episode length"
        value={formatDuration(source.durationSeconds)}
      />
      <ReviewFact
        label="Raw speech-recognition low-confidence share"
        value={`${formatPercent(stats.low, stats.words)} (${formatCount(stats.low)} of ${formatCount(stats.words)} words)`}
      />
    </dl>
  )
}
