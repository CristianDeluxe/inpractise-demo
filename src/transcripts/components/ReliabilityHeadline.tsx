import { formatCount } from '../formatters/formatCount'
import { formatReliability } from '../formatters/formatReliability'
import { formatWordCount } from '../formatters/formatWordCount'
import type { ReliabilityHeadlineProps } from './ReliabilityHeadlineProps'
import { reliabilityDefinition } from './reliabilityDefinition'

/** The figure that replaces mandatory review: how far the AI-final text can be trusted. */
export function ReliabilityHeadline({ summary }: ReliabilityHeadlineProps) {
  const { edits } = summary
  return (
    <section
      aria-label="AI-final reliability"
      className="lab-card mt-5 px-5 py-4"
    >
      <p className="font-serif text-xl font-semibold tabular-nums md:text-2xl">
        {`AI final · ${formatReliability(summary.reliability)} reliable · ${formatWordCount(summary.spotCheckWords)} to spot-check`}
      </p>
      <p className="meta-text mt-2">
        {`The AI-corrected text is the accepted version: ${formatCount(edits.auto + edits.accepted)} edits applied, ${formatCount(edits.uncertain)} left uncertain and not applied. Checking the marked words is optional.`}
      </p>
      <p className="meta-text mt-1">{reliabilityDefinition()}</p>
    </section>
  )
}
