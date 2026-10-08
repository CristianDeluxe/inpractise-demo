import type { UseReviewActionsInput } from './UseReviewActionsInput'

/** Replay and loop of one edit's audio by edit id, and undo that refocuses the reverted edit. */
export function useEditCommands(input: UseReviewActionsInput) {
  const replayEdit = (editId: string) => {
    const span = input.spanById.get(editId)
    if (span) void input.playSpan(span)
  }
  const toggleLoop = (editId: string) => {
    if (input.looping) {
      input.stopLoop()
      return
    }
    const span = input.spanById.get(editId)
    if (span) void input.loopSpan(span)
  }
  const undo = () => {
    const editId = input.undo()
    if (editId !== null) input.focusEdit(editId)
  }
  return { replayEdit, toggleLoop, undo }
}
