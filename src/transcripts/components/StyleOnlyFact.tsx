import { measuredQuality } from '../quality/measuredQuality'
import type { MeasuredQualityProps } from './MeasuredQualityProps'
import { ReviewFact } from './ReviewFact'

/** How many of the edits only changed style, for episodes that have been measured. */
export function StyleOnlyFact({ transcriptId }: MeasuredQualityProps) {
  const quality = measuredQuality[transcriptId]
  if (quality === undefined) return null
  return (
    <ReviewFact
      label="Style-only edits (fillers, stutters, formatting)"
      value={`${String(quality.styleOnly)} of ${String(quality.edits)}`}
    />
  )
}
