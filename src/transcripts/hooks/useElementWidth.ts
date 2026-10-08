import { useEffect, useState, type RefObject } from 'react'

export function useElementWidth(ref: RefObject<HTMLElement | null>) {
  const [width, setWidth] = useState(0)
  useEffect(() => {
    const element = ref.current
    if (!element || typeof ResizeObserver === 'undefined') return
    const observer = new ResizeObserver(() => {
      setWidth(element.clientWidth)
    })
    observer.observe(element)
    return () => {
      observer.disconnect()
    }
  }, [ref])
  return width
}
