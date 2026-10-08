import { ConfidenceWord } from './ConfidenceWord'
import type { ConfidenceWordsProps } from './ConfidenceWordsProps'

export function ConfidenceWords({
  words,
  onSeek,
  struck,
  showFlags = true,
}: ConfidenceWordsProps) {
  return (
    <p className="source-text">
      {words.map((word, index) => (
        <span key={`${String(word.start)}-${word.text}`}>
          <ConfidenceWord
            word={word}
            onSeek={onSeek}
            struck={struck?.[index] ?? false}
            showFlags={showFlags}
          />{' '}
        </span>
      ))}
    </p>
  )
}
