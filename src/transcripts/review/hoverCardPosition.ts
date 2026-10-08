import type { CSSProperties } from 'react'
import type { EditPreview } from './EditPreview'
import type { Viewport } from './Viewport'

/** Above the mark when there is room under the sticky console, otherwise below; never off-screen sideways. */
export function hoverCardPosition(
  preview: EditPreview,
  width: number,
  viewport: Viewport,
): CSSProperties {
  const gutter = 16
  const left = Math.min(
    Math.max(gutter, preview.left - 12),
    viewport.width - width - gutter,
  )
  return preview.top > 300
    ? { left, bottom: viewport.height - preview.top + 10 }
    : { left, top: preview.bottom + 10 }
}
