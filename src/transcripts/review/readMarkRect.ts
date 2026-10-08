import { editMarkQuery } from './editMarkQuery'
import type { MarkRect } from './MarkRect'

/** Viewport position of the first mark of an edit, or null when it is not rendered. */
export function readMarkRect(
  editId: string,
  floorElement: Element | null,
): MarkRect | null {
  const mark = document.querySelector(editMarkQuery(editId))
  if (!mark) return null
  const rect = mark.getBoundingClientRect()
  const column = mark.closest('section')?.getBoundingClientRect() ?? rect
  return {
    top: rect.top,
    bottom: rect.bottom,
    left: rect.left,
    columnRight: column.right,
    floor: floorElement?.getBoundingClientRect().bottom ?? 0,
  }
}
