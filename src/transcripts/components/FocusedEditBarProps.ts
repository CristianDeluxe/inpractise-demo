import type { RefObject } from 'react'
import type { CorrectionEdit } from '../contracts/CorrectionEdit'
import type { ReviewControls } from '../review/ReviewControls'

export type FocusedEditBarProps = {
  readonly edit: CorrectionEdit | undefined
  readonly controls: ReviewControls
  /** The sticky console; the bar never slides under it. */
  readonly consoleRef: RefObject<HTMLDivElement | null>
}
