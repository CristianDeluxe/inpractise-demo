import { useEffect, useState, type RefObject } from 'react'

/** Live border-box height of an element, for laying out what sticks below it. */
export function useElementHeight(ref: RefObject<HTMLElement | null>) {
  const [height, setHeight] = useState(0)
  useEffect(() => {
    const element = ref.current
    if (!element || typeof ResizeObserver === 'undefined') return
    const observer = new ResizeObserver(() => {
      setHeight(element.offsetHeight)
    })
    observer.observe(element)
    return () => {
      observer.disconnect()
    }
  }, [ref])
  return height
}
