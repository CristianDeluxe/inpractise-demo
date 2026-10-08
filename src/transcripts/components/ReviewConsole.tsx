import { AudioPlayer } from './AudioPlayer'
import type { ReviewConsoleProps } from './ReviewConsoleProps'
import { ReviewToolbar } from './ReviewToolbar'

/** Stays below the site header while scrolling, so the audio and counters are always in reach. */
export function ReviewConsole({ toolbar, audio }: ReviewConsoleProps) {
  return (
    <div className="md:sticky md:top-[5.1rem] z-30 -mx-3 mt-8 border-y border-border bg-background/95 px-3 py-3 backdrop-blur">
      <ReviewToolbar {...toolbar} />
      <div className="mt-2 flex flex-wrap items-center gap-x-6 gap-y-1">
        <div className="min-w-72 flex-1">
          <AudioPlayer {...audio} />
        </div>
        <p className="meta-text">
          j / k flagged paragraph, a accept, r reject. Click a word to play it.
        </p>
      </div>
    </div>
  )
}
