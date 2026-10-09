import { formatReliability } from '../formatters/formatReliability'
import { formatWordCount } from '../formatters/formatWordCount'
import type { ReliabilityHeadlineProps } from './ReliabilityHeadlineProps'

/** The figure that replaces mandatory review: how far the AI-final text can be trusted. */
export function ReliabilityHeadline({ summary }: ReliabilityHeadlineProps) {
  return (
    <section aria-label="AI-final reliability" className="px-4 pb-2">
      <p className="tabular-nums">
        <span className="block font-mono text-xs uppercase tracking-wide text-muted-foreground">
          AI final
        </span>
        <span className="hidden"> · </span>
        <span className="mt-1 block font-sans text-3xl font-semibold leading-tight">
          {`${formatReliability(summary.reliability)} reliable`}
        </span>
        <span className="hidden"> · </span>
        <span className="mt-1 block text-sm font-medium">
          {`${formatWordCount(summary.spotCheckWords)} to spot-check`}
        </span>
      </p>
      <p className="mt-2 text-sm text-muted-foreground">
        The AI-corrected text is the accepted version. Checking the marked words
        is optional.
      </p>
    </section>
  )
}
