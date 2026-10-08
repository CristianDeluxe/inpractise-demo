import { Repeat } from 'lucide-react'
import { createPortal } from 'react-dom'
import { useMarkRect } from '../hooks/useMarkRect'
import { decisionBarPosition } from '../review/decisionBarPosition'
import { BarVerdictButton } from './BarVerdictButton'
import { decisionBarHeight } from './decisionBarHeight'
import type { FocusedEditBarProps } from './FocusedEditBarProps'
import { reviewVerdicts } from './reviewVerdicts'

/** Accept, reject, flag and replay in the margin beside the selected line, off the words themselves. */
export function FocusedEditBar({ edit, controls, floor }: FocusedEditBarProps) {
  const rect = useMarkRect(edit?.id ?? null)
  if (!edit || !rect) return null
  const style = decisionBarPosition(rect, decisionBarHeight, {
    height: window.innerHeight,
    floor,
  })
  if (!style) return null
  return createPortal(
    <div
      role="toolbar"
      aria-label="Decide this edit"
      aria-orientation="vertical"
      style={style}
      className="hover-card fixed z-40 hidden w-10 flex-col items-center gap-1 rounded-full border border-border bg-popover p-1 lg:flex"
    >
      {reviewVerdicts.map((target) => (
        <BarVerdictButton
          key={target}
          editId={edit.id}
          target={target}
          controls={controls}
        />
      ))}
      <button
        type="button"
        aria-label="Replay this edit (e)"
        title="Replay this edit (e)"
        onClick={() => {
          controls.replayEdit(edit.id)
        }}
        className="inline-grid size-8 place-items-center rounded-full text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
      >
        <Repeat aria-hidden="true" className="size-4" />
      </button>
    </div>,
    document.body,
  )
}
