import { useDiffRows } from '../hooks/useDiffRows'
import { useParagraphDiff } from '../hooks/useParagraphDiff'
import { useSegments } from '../hooks/useSegments'
import type { DiffBodyProps } from './DiffBodyProps'
import { DiffRowView } from './DiffRowView'

/** Sentence rows: raw words on the left, the corrected text (honouring rejections) on the right. */
export function DiffBody({ paragraph, corrected, controls }: DiffBodyProps) {
  const struck = useParagraphDiff(paragraph, corrected, controls.decisions)
  const segments = useSegments(paragraph, corrected)
  const rows = useDiffRows(segments, paragraph.words)
  return (
    <div className="space-y-1">
      {rows.map((row) => (
        <DiffRowView
          key={row.firstWord}
          row={row}
          struck={struck}
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
