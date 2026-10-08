import { Check, Repeat, X } from 'lucide-react'
import { createPortal } from 'react-dom'
import { useMarkRect } from '../hooks/useMarkRect'
import { decisionBarPosition } from '../review/decisionBarPosition'
import { BarVerdictButton } from './BarVerdictButton'
import { decisionBarWidth } from './decisionBarWidth'
import type { FocusedEditBarProps } from './FocusedEditBarProps'

/** Accept, reject and replay right under the selected mark, so the eye stays on the text. */
export function FocusedEditBar({ edit, controls }: FocusedEditBarProps) {
  const rect = useMarkRect(edit?.id ?? null)
  if (!edit || !rect) return null
  const style = decisionBarPosition(rect, decisionBarWidth, {
    width: window.innerWidth,
    height: window.innerHeight,
  })
  if (!style) return null
  return createPortal(
    <div
      role="toolbar"
      aria-label="Decide this edit"
      style={style}
      className="hover-card fixed z-40 hidden w-[18.5rem] items-center gap-1 rounded-full border border-border bg-popover p-1 text-xs lg:flex"
    >
      <BarVerdictButton editId={edit.id} target="accepted" controls={controls}>
        <Check aria-hidden="true" className="size-3.5" />
        Accept <kbd className="kbd">a</kbd>
      </BarVerdictButton>
      <BarVerdictButton editId={edit.id} target="rejected" controls={controls}>
        <X aria-hidden="true" className="size-3.5" />
        Reject <kbd className="kbd">r</kbd>
      </BarVerdictButton>
      <button
        type="button"
        aria-label="Replay this edit's audio"
        onClick={() => {
          controls.replayEdit(edit.id)
        }}
        className="inline-grid size-8 place-items-center rounded-full text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
      >
        <Repeat aria-hidden="true" className="size-3.5" />
      </button>
    </div>,
    document.body,
  )
}
