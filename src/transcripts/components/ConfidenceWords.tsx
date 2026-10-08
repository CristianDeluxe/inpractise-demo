import { ConfidenceWord } from './ConfidenceWord'
import type { ConfidenceWordsProps } from './ConfidenceWordsProps'

export function ConfidenceWords({
  words,
  onSeek,
  struck,
}: ConfidenceWordsProps) {
  return (
    <p className="source-text">
      {words.map((word, index) => (
        <span key={`${String(word.start)}-${word.text}`}>
          <ConfidenceWord
            word={word}
            onSeek={onSeek}
            struck={struck?.[index] ?? false}
          />{' '}
        </span>
      ))}
    </p>
  )
}
