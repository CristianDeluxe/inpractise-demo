import { formatCount } from '../formatters/formatCount'
import { formatDuration } from '../formatters/formatDuration'
import { formatPercent } from '../formatters/formatPercent'
import { listEdits } from '../review/listEdits'
import { relistenMinutes } from '../review/relistenMinutes'
import { relistenPaddingSeconds } from '../review/relistenPaddingSeconds'
import { HeaderFigure } from './HeaderFigure'
import type { ReviewFiguresProps } from './ReviewFiguresProps'

/** What a reviewer has to listen to with triage, against a full pass of the audio. */
export function ReviewFigures({ transcript, correction }: ReviewFiguresProps) {
  const { stats, source } = transcript
  const relisten = relistenMinutes(transcript)
  const edits = correction ? listEdits(correction) : []
  const learned = edits.filter((edit) => edit.origin === 'memory').length
  return (
    <dl className="lab-card mt-5 grid md:mt-8 grid-cols-2 divide-border overflow-hidden max-md:[&>*:nth-child(n+3)]:border-t md:grid-cols-4 md:divide-x">
      <HeaderFigure
        label="Full listen"
        value={formatDuration(source.durationSeconds)}
        duration={`PT${String(Math.round(source.durationSeconds))}S`}
        detail="Full episode length"
      />
      <HeaderFigure
        label="Audio to re-listen"
        value={`~${String(relisten)} min`}
        duration={`PT${String(relisten)}M`}
        detail={`${formatPercent(relisten * 60, source.durationSeconds)} of the episode: uncertain words, ${String(relistenPaddingSeconds)} s either side`}
        emphasis
      />
      <HeaderFigure
        label="Low confidence"
        value={formatPercent(stats.low, stats.words)}
        detail={`${formatCount(stats.low)} of ${formatCount(stats.words)} words`}
      />
      <HeaderFigure
        label="Edits proposed"
        value={correction ? formatCount(edits.length) : 'None'}
        detail={
          correction
            ? `${formatCount(learned)} from learned memory, ${correction.model}`
            : 'Second pass not run yet'
        }
      />
    </dl>
  )
}
