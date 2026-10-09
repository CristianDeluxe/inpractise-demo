import { useCallback, useLayoutEffect, useRef } from 'react'
import { anchorLine } from '../review/anchorLine'
import { captureViewAnchor } from '../review/captureViewAnchor'
import { restoreViewAnchor } from '../review/restoreViewAnchor'
import type { ReviewFilter } from '../review/ReviewFilter'
import type { ReviewMode } from '../review/ReviewMode'
import type { ViewAnchor } from '../review/ViewAnchor'
import type { ViewAnchorInput } from './ViewAnchorInput'

/**
 * Keeps the reader's place across a change of view: the mode and filter setters
 * remember the paragraph under the toolbar, and once the new view has committed
 * the window is scrolled so that paragraph, or its nearest in time, is where it was.
 */
export function useViewAnchor({ listRef, toolbarRef, view }: ViewAnchorInput) {
  const { mode, filter, setMode: applyMode, setFilter: applyFilter } = view
  const pending = useRef<ViewAnchor | null>(null)
  const remember = useCallback(() => {
    pending.current = captureViewAnchor(
      listRef.current,
      anchorLine(toolbarRef.current),
    )
  }, [listRef, toolbarRef])
  useLayoutEffect(() => {
    const anchor = pending.current
    pending.current = null
    if (anchor === null) return
    restoreViewAnchor(listRef.current, anchor, anchorLine(toolbarRef.current))
  }, [mode, filter, listRef, toolbarRef])
  const setMode = useCallback(
    (next: ReviewMode) => {
      if (next === mode) return
      remember()
      applyMode(next)
    },
    [mode, remember, applyMode],
  )
  const setFilter = useCallback(
    (next: ReviewFilter) => {
      if (next === filter) return
      remember()
      applyFilter(next)
    },
    [filter, remember, applyFilter],
  )
  return { setMode, setFilter }
}
