import { reliableWordThreshold } from '../reliability/reliableWordThreshold'
import type { ScoredWordButtonProps } from './ScoredWordButtonProps'
import { scoredWordClass } from './scoredWordClass'
import { scoredWordTitle } from './scoredWordTitle'

/** Only marked words take a tab stop, as in the confidence view. */
export function ScoredWordButton({ word, onSeek }: ScoredWordButtonProps) {
  return (
    <button
      type="button"
      tabIndex={word.score < reliableWordThreshold ? 0 : -1}
      title={scoredWordTitle(word.score)}
      onClick={() => {
        onSeek(word.start)
      }}
      className={scoredWordClass(word.score)}
    >
      {word.text}
    </button>
  )
}
