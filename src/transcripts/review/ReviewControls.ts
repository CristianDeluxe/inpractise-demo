import type { ReviewVerdict } from '../contracts/ReviewVerdict'
import type { DecisionMap } from './DecisionMap'

/** Everything a paragraph needs to act on the review without knowing where state lives. */
export type ReviewControls = {
  readonly seek: (seconds: number) => void
  readonly decisions: DecisionMap
  readonly decide: (
    editIds: readonly string[],
    verdict: ReviewVerdict | null,
  ) => void
  readonly focusedEditId: string | null
  readonly focusEdit: (editId: string) => void
  readonly previewEdit: (editId: string, element: HTMLElement) => void
  readonly endPreview: () => void
  /** Plays the audio of the words an edit rewrites, with a little context. */
  readonly replayEdit: (editId: string) => void
  /** Focuses the next undecided edit after the focused one. */
  readonly nextPending: () => void
}
