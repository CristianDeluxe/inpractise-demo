import { formatTimestamp } from '../formatters/formatTimestamp'
import type { ParagraphGutterProps } from './ParagraphGutterProps'
import { SpeakerGutter } from './SpeakerGutter'

/** Timestamp to replay from, who speaks, and the review note of one paragraph. */
export function ParagraphGutter({ start, note, onSeek }: ParagraphGutterProps) {
  const time = formatTimestamp(start)
  return (
    <div className="flex flex-row items-baseline gap-3 md:flex-col md:gap-1">
      <button
        type="button"
        onClick={() => {
          onSeek(start)
        }}
        aria-label={`Play from ${time}`}
        className="inline-flex min-h-11 items-center font-mono text-xs tabular-nums md:min-h-0 text-muted-foreground underline-offset-4 hover:text-primary hover:underline"
      >
        {time}
      </button>
      <SpeakerGutter start={start} />
      {note ? (
        <span className="font-mono text-xs leading-snug text-muted-foreground">
          {note}
        </span>
      ) : null}
    </div>
  )
}
