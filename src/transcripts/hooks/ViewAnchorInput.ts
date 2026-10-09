import type { RefObject } from 'react'
import type { WorkspaceView } from './WorkspaceView'

export type ViewAnchorInput = {
  /** The container that renders the paragraphs. */
  readonly listRef: RefObject<HTMLElement | null>
  /** The sticky toolbar; its bottom edge is the line the text is read below. */
  readonly toolbarRef: RefObject<HTMLElement | null>
  readonly view: WorkspaceView
}
