import { useEffect, useRef } from 'react'
import { subscribeMotion } from '../subscribeMotion'

/**
 * Hide content only when motion is allowed and an observer can reveal it.
 * Cleanup restores visibility as well as disconnecting the observer, so a switch
 * to reduced motion cannot strand content in its hidden pre-reveal state.
 */
export function useReveal() {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const node = ref.current
    if (!node) return
    return subscribeMotion(() => {
      if (typeof IntersectionObserver === 'undefined') return () => {}
      node.dataset['visible'] = 'false'
      const observer = new IntersectionObserver(
        (entries) => {
          if (entries.some((entry) => entry.isIntersecting)) {
            node.dataset['visible'] = 'true'
            observer.disconnect()
          }
        },
        { rootMargin: '0px 0px -12% 0px', threshold: 0.08 },
      )
      observer.observe(node)
      return () => {
        observer.disconnect()
        node.dataset['visible'] = 'true'
      }
    })
  }, [])
  return ref
}
