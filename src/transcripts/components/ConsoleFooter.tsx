import type { ConsoleFooterProps } from './ConsoleFooterProps'
import { ReviewNavigation } from './ReviewNavigation'
import { SpotCheckAudioKey } from './SpotCheckAudioKey'

/**
 * The console's last row, the same height in every view: review progress and
 * stepping on the left when the view reviews edits, the waveform key on the
 * right. Its fixed height keeps the player from shifting between views.
 */
export function ConsoleFooter({ toolbar }: ConsoleFooterProps) {
  return (
    <div className="flex min-h-10 flex-wrap items-center gap-x-4 gap-y-2">
      {toolbar.mode === 'final' ? null : <ReviewNavigation {...toolbar} />}
      <SpotCheckAudioKey />
    </div>
  )
}
