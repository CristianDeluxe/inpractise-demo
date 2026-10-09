import { useDiffRows } from '../hooks/useDiffRows'
import { DiffRowView } from './DiffRowView'
import type { DiffTurnProps } from './DiffTurnProps'

/** One speaker turn side by side: sentence rows, raw words left and the corrected text right. */
export function DiffTurn({ turn, struck, controls }: DiffTurnProps) {
  const rows = useDiffRows(turn.segments, turn.words)
  const own = struck.slice(turn.firstWord, turn.firstWord + turn.words.length)
  return (
    <div className="space-y-1">
      {rows.map((row) => (
        <DiffRowView
          key={row.firstWord}
          row={row}
          struck={own}
          focused={row.segments.some(
            (segment) =>
              segment.edit !== null &&
              segment.edit.id === controls.focusedEditId,
          )}
          controls={controls}
        />
      ))}
    </div>
  )
}
