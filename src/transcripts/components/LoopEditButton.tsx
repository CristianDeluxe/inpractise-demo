import { Repeat1 } from 'lucide-react'
import type { LoopEditButtonProps } from './LoopEditButtonProps'

/** Repeats the edit's words until pressed again, for a word that needs several listens. */
export function LoopEditButton({
  span,
  looping,
  onToggle,
}: LoopEditButtonProps) {
  if (span === undefined) return null
  return (
    <button
      type="button"
      aria-pressed={looping}
      onClick={onToggle}
      className="inline-flex min-h-9 items-center gap-2 rounded-full px-2 text-xs text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground aria-pressed:bg-primary aria-pressed:text-primary-foreground"
    >
      <Repeat1 aria-hidden="true" className="size-3.5" />
      {looping ? 'Stop loop' : 'Loop'}
      <kbd className="kbd">l</kbd>
    </button>
  )
}
