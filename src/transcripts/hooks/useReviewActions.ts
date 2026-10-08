import type { ReviewVerdict } from '../contracts/ReviewVerdict'
import { playbackKeyHandlers } from '../review/playbackKeyHandlers'
import type { ReviewControls } from '../review/ReviewControls'
import type { ReviewKeyHandlers } from './ReviewKeyHandlers'
import { useEditCommands } from './useEditCommands'
import type { UseReviewActionsInput } from './UseReviewActionsInput'

/** Pointer controls for the paragraphs and the keyboard handlers, over the same state. */
export function useReviewActions(input: UseReviewActionsInput) {
  const { decisions, decide, focus, advance } = input
  const { replayEdit, toggleLoop, undo } = useEditCommands(input)
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
    toggleLoop,
    looping: input.looping,
    undo,
    canUndo: input.canUndo,
  }
  const decideFocused = (verdict: ReviewVerdict) => () => {
    const editId = focus.editId
    if (editId === null) return
    decide([editId], verdict)
    advance(editId, new Map(decisions).set(editId, verdict))
  }
  const onFocused = (action: (editId: string) => void) => () => {
    if (focus.editId !== null) action(focus.editId)
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
    defer: decideFocused('deferred'),
    undo,
    nextPending: input.focusNextPending,
    replay: onFocused(replayEdit),
    loop: onFocused(toggleLoop),
    ...playbackKeyHandlers(input.audioRef),
  }
  return { controls, handlers }
}
