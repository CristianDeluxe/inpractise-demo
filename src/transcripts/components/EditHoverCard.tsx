import { createPortal } from 'react-dom'
import { hoverCardPosition } from '../review/hoverCardPosition'
import type { EditHoverCardProps } from './EditHoverCardProps'
import { EditSummary } from './EditSummary'
import { hoverCardWidth } from './hoverCardWidth'
import { VerdictButtons } from './VerdictButtons'

/** Floating preview of the change under the pointer, decidable without leaving the text. */
export function EditHoverCard({
  preview,
  edit,
  verdict,
  onDecide,
  onHold,
  onRelease,
}: EditHoverCardProps) {
  const style = hoverCardPosition(preview, hoverCardWidth, {
    width: window.innerWidth,
    height: window.innerHeight,
  })
  return createPortal(
    <div
      role="dialog"
      aria-label="Edit preview"
      onPointerEnter={onHold}
      onPointerLeave={onRelease}
      style={style}
      className="app-shell hover-card fixed z-50 w-[22rem] max-w-[calc(100vw-2rem)] rounded-lg border border-border bg-popover p-4 text-popover-foreground"
    >
      <EditSummary edit={edit} />
      <div className="mt-4">
        <VerdictButtons verdict={verdict} onDecide={onDecide} />
      </div>
    </div>,
    document.body,
  )
}
