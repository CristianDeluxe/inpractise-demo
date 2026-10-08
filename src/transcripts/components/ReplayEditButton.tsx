import { Repeat } from 'lucide-react'
import { formatTimestamp } from '../formatters/formatTimestamp'
import type { ReplayEditButtonProps } from './ReplayEditButtonProps'

/** Plays just the words this edit rewrites, padded with a moment of context. */
export function ReplayEditButton({ span, onReplay }: ReplayEditButtonProps) {
  if (span === undefined) return null
  return (
    <button
      type="button"
      onClick={onReplay}
      className="inline-flex min-h-9 items-center gap-2 rounded-full px-2 text-xs text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
    >
      <Repeat aria-hidden="true" className="size-3.5" />
      Replay {formatTimestamp(span.start)}
      <kbd className="kbd">e</kbd>
    </button>
  )
}
