import { AudioPlayer } from './AudioPlayer'
import type { ReviewConsoleProps } from './ReviewConsoleProps'
import { ReviewToolbar } from './ReviewToolbar'
import { ShortcutReference } from './ShortcutReference'

/** Stays below the site header while scrolling, so the audio and counters are always in reach. */
export function ReviewConsole({
  toolbar,
  audio,
  consoleRef,
}: ReviewConsoleProps) {
  return (
    <div
      ref={consoleRef}
      className="z-30 mt-8 rounded-2xl border border-border bg-background/90 px-3 py-3 backdrop-blur-md md:sticky md:top-[5.6rem] md:px-4"
    >
      <ReviewToolbar {...toolbar} />
      <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-1">
        <div className="min-w-64 flex-1">
          <AudioPlayer {...audio} />
        </div>
        <p className="hidden items-center gap-2 text-xs text-muted-foreground xl:flex">
          <span
            aria-hidden="true"
            className="h-1.5 w-4 rounded-full bg-primary"
          />
          Audio to re-listen
        </p>
      </div>
      <ShortcutReference />
    </div>
  )
}
