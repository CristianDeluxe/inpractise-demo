import { useEffect } from 'react'
import { isTypingTarget } from '../review/isTypingTarget'
import type { ReviewKeyHandlers } from './ReviewKeyHandlers'

/** j/k move between flagged paragraphs; a/r accept or reject the focused edit. */
export function useReviewKeys(handlers: ReviewKeyHandlers) {
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.ctrlKey || event.metaKey || event.altKey) return
      if (isTypingTarget(event.target)) return
      const action = {
        j: handlers.next,
        k: handlers.previous,
        a: handlers.accept,
        r: handlers.reject,
      }[event.key]
      if (!action) return
      event.preventDefault()
      action()
    }
    window.addEventListener('keydown', onKey)
    return () => {
      window.removeEventListener('keydown', onKey)
    }
  }, [handlers])
}
