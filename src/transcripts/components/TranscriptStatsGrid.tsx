import { formatCount } from '../formatters/formatCount'
import { formatPercent } from '../formatters/formatPercent'
import { CorrectionStatCells } from './CorrectionStatCells'
import { StatCell } from './StatCell'
import type { TranscriptStatsGridProps } from './TranscriptStatsGridProps'

export function TranscriptStatsGrid({
  transcript,
  correction,
}: TranscriptStatsGridProps) {
  const { stats } = transcript
  return (
    <dl className="mt-8 grid grid-cols-2 border-l border-t border-border md:grid-cols-4">
      <StatCell label="Words" value={formatCount(stats.words)} />
      <StatCell
        label="Low confidence"
        value={formatPercent(stats.low, stats.words)}
        detail={`${formatCount(stats.low)} words`}
      />
      <StatCell
        label="Medium confidence"
        value={formatPercent(stats.medium, stats.words)}
        detail={`${formatCount(stats.medium)} words`}
      />
      {correction ? (
        <CorrectionStatCells correction={correction} />
      ) : (
        <StatCell label="Second pass" value="Not run" />
      )}
    </dl>
  )
}
