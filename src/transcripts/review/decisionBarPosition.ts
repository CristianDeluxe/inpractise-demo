import type { CSSProperties } from 'react'
import { barFlipTop } from './barFlipTop'
import type { MarkRect } from './MarkRect'
import type { Viewport } from './Viewport'

/**
 * Just above the mark, so the words that follow stay readable, or below it
 * near the top of the screen; kept inside the viewport sideways and hidden
 * once the mark leaves the screen.
 */
export function decisionBarPosition(
  rect: MarkRect,
  width: number,
  viewport: Viewport,
): CSSProperties | null {
  if (rect.bottom < 0 || rect.top > viewport.height) return null
  const gutter = 16
  const left = Math.max(
    gutter,
    Math.min(rect.left - 4, viewport.width - width - gutter),
  )
  return rect.top > barFlipTop
    ? { left, bottom: viewport.height - rect.top + 6 }
    : { left, top: rect.bottom + 6 }
}
