import { useEffect, useState } from 'react'
import type { MarkRect } from '../review/MarkRect'
import { readMarkRect } from '../review/readMarkRect'
import type { MarkRectState } from './MarkRectState'

/** Follows an edit's mark through scrolling and resizing, one read per frame. */
export function useMarkRect(editId: string | null): MarkRect | null {
  const [state, setState] = useState<MarkRectState | null>(null)
  useEffect(() => {
    if (editId === null) return
    let frame = 0
    const update = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        setState({ editId, rect: readMarkRect(editId) })
      })
    }
    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [editId])
  return state !== null && state.editId === editId ? state.rect : null
}
