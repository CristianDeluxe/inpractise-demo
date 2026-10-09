import { useRef, type RefObject } from 'react'
import type { TranscriptBundle } from '../api/TranscriptBundle'
import { buildToolbarProps } from '../review/buildToolbarProps'
import type { ReviewWorkspaceState } from './ReviewWorkspaceState'
import { useViewAnchor } from './useViewAnchor'

/** Toolbar wiring whose view and filter changes keep the reader's place in the list `listRef` points at. */
export function useAnchoredToolbar(
  bundle: TranscriptBundle,
  ws: ReviewWorkspaceState,
  toolbarRef: RefObject<HTMLElement | null>,
) {
  const listRef = useRef<HTMLDivElement>(null)
  const anchored = useViewAnchor({ listRef, toolbarRef, view: ws.view })
  const toolbar = {
    ...buildToolbarProps(bundle, ws),
    onModeChange: anchored.setMode,
    onFilterChange: anchored.setFilter,
  }
  return { listRef, toolbar }
}
