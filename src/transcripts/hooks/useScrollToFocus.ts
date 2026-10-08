import { useEffect } from 'react'
import type { ReviewFocus } from '../review/ReviewFocus'
import { scrollFocusIntoView } from '../review/scrollFocusIntoView'

export function useScrollToFocus(focus: ReviewFocus) {
  useEffect(() => {
    scrollFocusIntoView(focus)
  }, [focus])
}
