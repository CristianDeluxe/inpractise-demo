import type { RefObject } from 'react'
import type { ReviewVerdict } from '../contracts/ReviewVerdict'
import type { DecisionMap } from '../review/DecisionMap'
import type { ReviewFocus } from '../review/ReviewFocus'
import type { TimeInterval } from '../review/TimeInterval'

export type UseReviewActionsInput = {
  readonly decisions: DecisionMap
  readonly decide: (
    editIds: readonly string[],
    verdict: ReviewVerdict | null,
  ) => void
  readonly focus: ReviewFocus
  readonly focusEdit: (editId: string) => void
  readonly moveParagraph: (step: 1 | -1) => void
  readonly advance: (afterId: string, decided: DecisionMap) => void
  readonly focusNextPending: () => void
  readonly seekTo: (seconds: number) => Promise<void>
  readonly playSpan: (span: TimeInterval) => Promise<void>
  readonly loopSpan: (span: TimeInterval) => Promise<void>
  readonly stopLoop: () => void
  readonly looping: boolean
  readonly undo: () => string | null
  readonly canUndo: boolean
  readonly spanById: ReadonlyMap<string, TimeInterval>
  readonly audioRef: RefObject<HTMLAudioElement | null>
  readonly previewEdit: (editId: string, element: HTMLElement) => void
  readonly endPreview: () => void
}
