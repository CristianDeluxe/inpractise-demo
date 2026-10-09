import type { ConfidenceBodyProps } from './ConfidenceBodyProps'
import { ConfidenceWords } from './ConfidenceWords'
import { ParagraphTurns } from './ParagraphTurns'

/** The raw recognition coloured by confidence, one row per speaker turn. */
export function ConfidenceBody({
  paragraph,
  corrected,
  note,
  active,
  onSeek,
}: ConfidenceBodyProps) {
  return (
    <ParagraphTurns
      paragraph={paragraph}
      corrected={corrected}
      note={note}
      active={active}
      onSeek={onSeek}
      renderTurn={(turn) => (
        <ConfidenceWords words={turn.words} onSeek={onSeek} />
      )}
    />
  )
}
