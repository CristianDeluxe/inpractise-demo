import { useActiveRun } from '../hooks/useActiveRun'
import { useParagraphTurns } from '../hooks/useParagraphTurns'
import { turnStarts } from '../review/turnStarts'
import type { ParagraphTurnsProps } from './ParagraphTurnsProps'
import { TurnRow } from './TurnRow'

/** A paragraph as speaker turns, the layout every review view shares; the view supplies each turn's text. */
export function ParagraphTurns({
  paragraph,
  corrected,
  note,
  active,
  onSeek,
  renderTurn,
}: ParagraphTurnsProps) {
  const turns = useParagraphTurns(paragraph, corrected)
  const starts = turnStarts(paragraph.start, turns)
  const playing = useActiveRun(active, starts)
  return (
    <div>
      {turns.map((turn, index) => (
        <TurnRow
          key={turn.firstWord}
          start={starts[index] ?? paragraph.start}
          note={index === 0 ? note : null}
          active={playing === index}
          onSeek={onSeek}
        >
          {renderTurn(turn)}
        </TurnRow>
      ))}
    </div>
  )
}
