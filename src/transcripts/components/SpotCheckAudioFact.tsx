import { formatPercent } from '../formatters/formatPercent'
import { relistenMinutes } from '../review/relistenMinutes'
import { ReviewFact } from './ReviewFact'
import type { SpotCheckAudioFactProps } from './SpotCheckAudioFactProps'

/** How much audio the optional spot-check covers, against the length of the episode. */
export function SpotCheckAudioFact({ transcript }: SpotCheckAudioFactProps) {
  const minutes = relistenMinutes(transcript)
  return (
    <dl aria-label="Spot-check audio" className="text-sm">
      <ReviewFact
        label="Optional spot-check audio"
        value={`~${String(minutes)} min (${formatPercent(minutes * 60, transcript.source.durationSeconds)})`}
      />
    </dl>
  )
}
