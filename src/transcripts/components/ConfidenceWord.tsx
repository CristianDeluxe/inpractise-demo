import { isSeekableWord } from '../review/isSeekableWord'
import { wordTitle } from '../review/wordTitle'
import type { ConfidenceWordProps } from './ConfidenceWordProps'
import { wordClassName } from './wordClassName'

/** Only flagged words take a tab stop; a tab stop on every word would bury the edits. */
export function ConfidenceWord({
  word,
  onSeek,
  struck = false,
  showFlags = true,
}: ConfidenceWordProps) {
  const base = wordClassName(word.band, showFlags && word.flags.length > 0)
  return (
    <button
      type="button"
      tabIndex={isSeekableWord(word) ? 0 : -1}
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
