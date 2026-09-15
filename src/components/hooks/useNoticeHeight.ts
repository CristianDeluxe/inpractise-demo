import { noticeHeightVariable } from '@/components/noticeHeightVariable'
import { useLayoutEffect, useRef } from 'react'

/**
 * Publish the notice bar's height so the workspace shell can subtract it.
 * The bar is sticky and its height changes with wrapping, so a fixed value
 * would leave the sidebar cut off at some widths.
 */
export function useNoticeHeight() {
  const ref = useRef<HTMLDivElement>(null)
  useLayoutEffect(() => {
    const element = ref.current
    const root = document.documentElement
    if (!element) return
    const publish = () => {
      root.style.setProperty(
        noticeHeightVariable,
        `${String(element.offsetHeight)}px`,
      )
    }
    const clear = () => {
      root.style.setProperty(noticeHeightVariable, '0px')
    }
    publish()
    if (typeof ResizeObserver === 'undefined') return clear
    const observer = new ResizeObserver(publish)
    observer.observe(element)
    return () => {
      observer.disconnect()
      clear()
    }
  }, [])
  return ref
}
