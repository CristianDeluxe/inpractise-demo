import { editMarkQuery } from './editMarkQuery'
import { paragraphElementId } from './paragraphElementId'
import type { ReviewFocus } from './ReviewFocus'

/**
 * Brings the focused edit into view, clear of the sticky console and of the
 * phone's edit sheet (scroll margins in CSS), or else centres the paragraph.
 */
export function scrollFocusIntoView(focus: ReviewFocus) {
  const mark =
    focus.editId === null
      ? null
      : document.querySelector(editMarkQuery(focus.editId))
  if (mark) {
    mark.scrollIntoView({ block: 'nearest' })
    return
  }
  if (focus.paragraphId === null) return
  document
    .getElementById(paragraphElementId(focus.paragraphId))
    ?.scrollIntoView({ block: 'center' })
}
