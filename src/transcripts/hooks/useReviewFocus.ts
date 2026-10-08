import { useCallback, useState } from 'react'
import { adjacentId } from '../review/adjacentId'
import type { DecisionMap } from '../review/DecisionMap'
import { firstEditIdIn } from '../review/firstEditIdIn'
import { nextPendingEditId } from '../review/nextPendingEditId'
import type { ReviewFocus } from '../review/ReviewFocus'
import type { UseReviewFocusInput } from './UseReviewFocusInput'

/** Which paragraph and edit the keyboard acts on. */
export function useReviewFocus({
  flaggedIds,
  edits,
  decisions,
}: UseReviewFocusInput) {
  const [focus, setFocus] = useState<ReviewFocus>({
    paragraphId: null,
    editId: null,
  })
  const moveParagraph = useCallback(
    (step: 1 | -1) => {
      const paragraphId = adjacentId(flaggedIds, focus.paragraphId, step)
      if (paragraphId === null) return
      setFocus({
        paragraphId,
        editId: firstEditIdIn(edits, paragraphId, decisions),
      })
    },
    [decisions, edits, flaggedIds, focus.paragraphId],
  )
  const focusEdit = useCallback(
    (editId: string) => {
      const edit = edits.find((candidate) => candidate.id === editId)
      if (edit) setFocus({ paragraphId: edit.paragraphId, editId })
    },
    [edits],
  )
  const advance = useCallback(
    (afterId: string, decided: DecisionMap) => {
      const editId = nextPendingEditId(edits, decided, afterId)
      const edit = edits.find((candidate) => candidate.id === editId)
      if (edit) setFocus({ paragraphId: edit.paragraphId, editId: edit.id })
    },
    [edits],
  )
  return { focus, moveParagraph, focusEdit, advance }
}
