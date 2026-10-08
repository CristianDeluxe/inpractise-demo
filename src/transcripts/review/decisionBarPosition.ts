import type { CSSProperties } from 'react'
import { barMarginGap } from './barMarginGap'
import type { BarViewport } from './BarViewport'
import type { MarkRect } from './MarkRect'

/**
 * In the margin past the paragraph, level with the mark's line, so no word is
 * covered; held below the sticky console and inside the viewport, and hidden
 * once the mark leaves the readable area.
 */
export function decisionBarPosition(
  rect: MarkRect,
  height: number,
  viewport: BarViewport,
): CSSProperties | null {
  if (rect.bottom < viewport.floor || rect.top > viewport.height) return null
  const lowest = viewport.height - height - barMarginGap
  const top = Math.max(viewport.floor, Math.min(rect.top - 6, lowest))
  return { left: rect.columnRight + barMarginGap, top }
}
