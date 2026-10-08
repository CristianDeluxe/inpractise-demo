import { Pause, Play } from 'lucide-react'
import type { PlayToggleProps } from './PlayToggleProps'

export function PlayToggle({ playing, onToggle }: PlayToggleProps) {
  return (
    <button
      type="button"
      aria-label={playing ? 'Pause' : 'Play'}
      onClick={onToggle}
      className="grid size-11 shrink-0 place-items-center rounded-full bg-foreground text-background transition-[background-color,scale] duration-150 hover:bg-foreground/85 motion-safe:active:scale-[0.96] md:size-10"
    >
      {playing ? (
        <Pause aria-hidden="true" className="size-4 fill-current" />
      ) : (
        <Play aria-hidden="true" className="ml-0.5 size-4 fill-current" />
      )}
    </button>
  )
}
