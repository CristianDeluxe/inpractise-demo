import type { ReviewVerdict } from '../contracts/ReviewVerdict'
import { playbackKeyHandlers } from '../review/playbackKeyHandlers'
import type { ReviewControls } from '../review/ReviewControls'
import type { ReviewKeyHandlers } from './ReviewKeyHandlers'
import type { UseReviewActionsInput } from './UseReviewActionsInput'

/** Pointer controls for the paragraphs and the keyboard handlers, over the same state. */
export function useReviewActions(input: UseReviewActionsInput) {
  const { decisions, decide, focus, advance } = input
  const replayEdit = (editId: string) => {
    const span = input.spanById.get(editId)
    if (span) void input.playSpan(span)
  }
  const controls: ReviewControls = {
    seek: (seconds) => {
      void input.seekTo(seconds)
    },
    decisions,
    decide,
    focusedEditId: focus.editId,
    focusEdit: input.focusEdit,
    previewEdit: input.previewEdit,
    endPreview: input.endPreview,
    replayEdit,
    nextPending: input.focusNextPending,
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
    nextPending: input.focusNextPending,
    replay: () => {
      if (focus.editId !== null) replayEdit(focus.editId)
    },
    ...playbackKeyHandlers(input.audioRef),
  }
  return { controls, handlers }
}
