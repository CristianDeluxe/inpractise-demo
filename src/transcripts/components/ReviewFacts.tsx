import { formatCount } from '../formatters/formatCount'
import { formatDuration } from '../formatters/formatDuration'
import { formatPercent } from '../formatters/formatPercent'
import { ReviewFact } from './ReviewFact'
import type { ReviewFactsProps } from './ReviewFactsProps'
import { StyleOnlyFact } from './StyleOnlyFact'

/** The figures behind the headline, once each, against the length of the episode. */
export function ReviewFacts({ transcript, reliability }: ReviewFactsProps) {
  const { stats, source } = transcript
  return (
    <dl aria-label="Transcript figures" className="text-sm">
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
          <StyleOnlyFact transcriptId={transcript.id} />
        </>
      )}
      <ReviewFact
        label="Raw speech-recognition low-confidence share"
        value={`${formatPercent(stats.low, stats.words)} (${formatCount(stats.low)} of ${formatCount(stats.words)} words)`}
      />
      <ReviewFact
        label="Episode length"
        value={formatDuration(source.durationSeconds)}
      />
    </dl>
  )
}
