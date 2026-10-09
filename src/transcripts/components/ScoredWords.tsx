import { ScoredWordButton } from './ScoredWordButton'
import type { ScoredWordsProps } from './ScoredWordsProps'

/** AI-final words, each replaying the audio from where it is spoken. */
export function ScoredWords({ words, onSeek }: ScoredWordsProps) {
  return (
    <p className="source-text">
      {words.map((word, index) => (
        <span key={`${String(index)}-${word.text}`}>
          <ScoredWordButton word={word} onSeek={onSeek} />{' '}
        </span>
      ))}
    </p>
  )
}
