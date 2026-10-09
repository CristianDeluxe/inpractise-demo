import { ParagraphTurns } from './ParagraphTurns'
import { TrackedText } from './TrackedText'
import type { TurnBodyProps } from './TurnBodyProps'

/** Corrected text with every proposed change tracked in place, one row per speaker turn. */
export function InlineBody({
  paragraph,
  corrected,
  controls,
  note,
  active,
}: TurnBodyProps) {
  return (
    <ParagraphTurns
      paragraph={paragraph}
      corrected={corrected}
      note={note}
      active={active}
      onSeek={controls.seek}
      renderTurn={(turn) => (
        <TrackedText
          segments={turn.segments}
          words={turn.words}
          variant="inline"
          controls={controls}
        />
      )}
    />
  )
}
