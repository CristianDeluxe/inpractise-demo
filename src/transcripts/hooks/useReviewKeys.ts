import { useEffect } from 'react'
import { isTypingTarget } from '../review/isTypingTarget'
import { reviewKeyAction } from '../review/reviewKeyAction'
import type { ReviewKeyHandlers } from './ReviewKeyHandlers'

/** Review keys: paragraphs, edits, verdicts and playback; see shortcutItems. */
export function useReviewKeys(handlers: ReviewKeyHandlers) {
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.ctrlKey || event.metaKey || event.altKey) return
      if (isTypingTarget(event.target)) return
      const action = reviewKeyAction(handlers, event.key)
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
