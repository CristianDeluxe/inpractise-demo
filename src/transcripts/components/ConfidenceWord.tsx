import { wordTitle } from '../review/wordTitle'
import type { ConfidenceWordProps } from './ConfidenceWordProps'
import { wordClassName } from './wordClassName'

/** Tab stops belong to the timestamp and edit buttons, not to every word. */
export function ConfidenceWord({
  word,
  onSeek,
  struck = false,
}: ConfidenceWordProps) {
  const base = wordClassName(word.band, word.flags.length > 0)
  return (
    <button
      type="button"
      tabIndex={-1}
      title={wordTitle(word)}
      onClick={() => {
        onSeek(word.start)
      }}
      className={struck ? `${base} line-through decoration-destructive` : base}
    >
      {word.text}
    </button>
  )
}
