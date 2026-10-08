import type { ReviewKeyHandlers } from '../hooks/ReviewKeyHandlers'

/** The handler a review key triggers; the list matches shortcutItems. */
export function reviewKeyAction(handlers: ReviewKeyHandlers, key: string) {
  const actions: Record<string, (() => void) | undefined> = {
    j: handlers.next,
    k: handlers.previous,
    a: handlers.accept,
    r: handlers.reject,
    n: handlers.nextPending,
    e: handlers.replay,
    p: handlers.togglePlay,
    '[': handlers.back,
    ']': handlers.forward,
  }
  return actions[key]
}
