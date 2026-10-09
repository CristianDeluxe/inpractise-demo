import { useEffect, useRef } from 'react'
import type { ReviewFocus } from '../review/ReviewFocus'
import { scrollFocusIntoView } from '../review/scrollFocusIntoView'

/**
 * Scrolls the focused edit into view. A change of view re-lays the text and
 * keeps the reader's place instead, so the commit that switches `viewKey` is skipped.
 */
export function useScrollToFocus(focus: ReviewFocus, viewKey: string) {
  const shownView = useRef(viewKey)
  useEffect(() => {
    if (shownView.current !== viewKey) {
      shownView.current = viewKey
      return
    }
    scrollFocusIntoView(focus)
  }, [focus, viewKey])
}
