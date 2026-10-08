import { useCallback, useEffect, useRef, useState } from 'react'
import type { EditPreview } from '../review/EditPreview'
import { previewCloseDelayMs } from './previewCloseDelayMs'

/** Hover card state: opens on a mark, survives the trip into the card, closes on scroll. */
export function useEditPreview() {
  const [preview, setPreview] = useState<EditPreview | null>(null)
  const timer = useRef<number | undefined>(undefined)
  const hold = useCallback(() => {
    window.clearTimeout(timer.current)
  }, [])
  const open = useCallback(
    (editId: string, element: HTMLElement) => {
      hold()
      const rect = element.getBoundingClientRect()
      setPreview({
        editId,
        top: rect.top,
        bottom: rect.bottom,
        left: rect.left,
      })
    },
    [hold],
  )
  const close = useCallback(() => {
    window.clearTimeout(timer.current)
    timer.current = window.setTimeout(() => {
      setPreview(null)
    }, previewCloseDelayMs)
  }, [])
  useEffect(() => {
    const dismiss = () => {
      setPreview(null)
    }
    window.addEventListener('scroll', dismiss, { passive: true })
    return () => {
      window.removeEventListener('scroll', dismiss)
      window.clearTimeout(timer.current)
    }
  }, [])
  return { preview, open, close, hold }
}
