import { AudioPlayer } from './AudioPlayer'
import { ConsoleFooter } from './ConsoleFooter'
import type { ReviewConsoleProps } from './ReviewConsoleProps'
import { ReviewToolbar } from './ReviewToolbar'
import { ShortcutReference } from './ShortcutReference'

/** One sticky block at the top of the transcript: views, player, and the key to the waveform's orange lane. */
export function ReviewConsole({
  toolbar,
  audio,
  consoleRef,
}: ReviewConsoleProps) {
  return (
    <div
      ref={consoleRef}
      className="z-30 sm:sticky sm:top-4 sm:before:absolute sm:before:-inset-x-px sm:before:-top-[17px] sm:before:h-4 sm:before:bg-background sm:before:content-[''] space-y-4 rounded-lg border border-border bg-card px-3 py-4 md:px-5"
    >
      <ReviewToolbar {...toolbar} />
      <AudioPlayer {...audio} />
      <ShortcutReference />
      <ConsoleFooter toolbar={toolbar} />
    </div>
  )
}
