import { useEffect, type RefObject } from 'react'

/**
 * A pending save must not wait out its pause when the tab goes away or the
 * workspace unmounts; the PUT is sent with keepalive so it survives the page.
 */
export function useFlushOnLeave(
  timer: RefObject<number | null>,
  flush: () => Promise<void>,
) {
  useEffect(() => {
    const flushPending = () => {
      if (timer.current === null) return
      window.clearTimeout(timer.current)
      void flush()
    }
    window.addEventListener('pagehide', flushPending)
    return () => {
      window.removeEventListener('pagehide', flushPending)
      flushPending()
    }
  }, [flush, timer])
}
