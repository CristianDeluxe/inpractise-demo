import type { ReviewVerdict } from '../contracts/ReviewVerdict'
import type { ReviewControls } from '../review/ReviewControls'
import type { ReviewKeyHandlers } from './ReviewKeyHandlers'
import type { UseReviewActionsInput } from './UseReviewActionsInput'

/** Pointer controls for the paragraphs and the keyboard handlers, over the same state. */
export function useReviewActions(input: UseReviewActionsInput) {
  const { decisions, decide, focus, advance } = input
  const controls: ReviewControls = {
    seek: (seconds) => {
      void input.seekTo(seconds)
    },
    decisions,
    decide,
    focusedEditId: focus.editId,
    focusEdit: input.focusEdit,
  }
  const decideFocused = (verdict: ReviewVerdict) => () => {
    const editId = focus.editId
    if (editId === null) return
    decide([editId], verdict)
    advance(editId, new Map(decisions).set(editId, verdict))
  }
  const handlers: ReviewKeyHandlers = {
    next: () => {
      input.moveParagraph(1)
    },
    previous: () => {
      input.moveParagraph(-1)
    },
    accept: decideFocused('accepted'),
    reject: decideFocused('rejected'),
  }
  return { controls, handlers }
}
