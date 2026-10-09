import { useParagraphDiff } from '../hooks/useParagraphDiff'
import { DiffTurn } from './DiffTurn'
import { ParagraphTurns } from './ParagraphTurns'
import type { TurnBodyProps } from './TurnBodyProps'

/** Raw words on the left, the corrected text (honouring rejections) on the right, one block per speaker turn. */
export function DiffBody({
  paragraph,
  corrected,
  controls,
  note,
  active,
}: TurnBodyProps) {
  const struck = useParagraphDiff(paragraph, corrected, controls.decisions)
  return (
    <ParagraphTurns
      paragraph={paragraph}
      corrected={corrected}
      note={note}
      active={active}
      onSeek={controls.seek}
      renderTurn={(turn) => (
        <DiffTurn turn={turn} struck={struck} controls={controls} />
      )}
    />
  )
}
