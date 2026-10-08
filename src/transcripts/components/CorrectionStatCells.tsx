import { formatCount } from '../formatters/formatCount'
import { countByCategory } from '../review/countByCategory'
import { listEdits } from '../review/listEdits'
import type { CorrectionStatCellsProps } from './CorrectionStatCellsProps'
import { StatCell } from './StatCell'

export function CorrectionStatCells({ correction }: CorrectionStatCellsProps) {
  const edits = listEdits(correction)
  const { memory, usage } = correction
  return (
    <>
      <StatCell
        label="Edits proposed"
        value={formatCount(edits.length)}
        detail={countByCategory(edits)
          .map(([category, count]) => `${category} ${String(count)}`)
          .join(' / ')}
      />
      <StatCell
        label="Memory hits"
        value={formatCount(memory.glossaryHits)}
        detail={`${String(memory.glossaryEntries)} glossary entries, ${String(memory.examplesUsed)} examples`}
      />
      <StatCell
        label="Second pass"
        value={correction.model}
        detail={`${(correction.durationMs / 1000).toFixed(1)} s via ${correction.provider}`}
      />
      <StatCell
        label="Tokens"
        value={formatCount(usage.inputTokens + usage.outputTokens)}
        detail={`${formatCount(usage.inputTokens)} in / ${formatCount(usage.outputTokens)} out`}
      />
    </>
  )
}
