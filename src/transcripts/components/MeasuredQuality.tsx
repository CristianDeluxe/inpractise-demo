import { formatRate } from '../formatters/formatRate'
import { measuredOn } from '../quality/measuredOn'
import { measuredQuality } from '../quality/measuredQuality'
import { qualityMethodUrl } from '../quality/qualityMethodUrl'
import type { MeasuredQualityProps } from './MeasuredQualityProps'
import { ReviewFact } from './ReviewFact'

/** The AI final checked against independent recognisers, for episodes that have been measured. */
export function MeasuredQuality({ transcriptId }: MeasuredQualityProps) {
  const quality = measuredQuality[transcriptId]
  if (quality === undefined) return null
  return (
    <section
      aria-label="Checked against independent recognisers"
      className="lab-card text-sm"
    >
      <h2 className="px-4 pt-3 font-sans text-sm font-semibold">
        Checked against independent recognisers
      </h2>
      <dl className="divide-y divide-border">
        <ReviewFact
          label="Word differences vs Whisper large-v3"
          value={`${formatRate(quality.finalWer)} (raw ${formatRate(quality.rawWer)})`}
        />
        <ReviewFact
          label="Content edits applied: confirmed / contradicted / contested"
          value={`${String(quality.confirmed)} / ${String(quality.contradicted)} / ${String(quality.contested)}`}
        />
        <ReviewFact
          label="Style-only edits (fillers, stutters, formatting)"
          value={`${String(quality.styleOnly)} of ${String(quality.edits)}`}
        />
      </dl>
      <p className="px-4 pb-3 pt-1 text-xs leading-relaxed text-muted-foreground">
        Measured {measuredOn} against Whisper, YouTube captions and an acoustic
        check. Machine references, not a human-verified transcript: they share
        errors on names.{' '}
        <a
          className="underline"
          href={qualityMethodUrl}
          rel="noreferrer"
          target="_blank"
        >
          Method and results
        </a>
      </p>
    </section>
  )
}
