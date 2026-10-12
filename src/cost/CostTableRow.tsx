import { formatDuration } from '@/transcripts/formatters/formatDuration'
import { asrSpeedLabel } from './asrSpeedLabel'
import { CostCell } from './CostCell'
import type { CostTableRowProps } from './CostTableRowProps'
import { reliabilityLabel } from './reliabilityLabel'
import { shortModelName } from './shortModelName'
import { spotCheckTimeLabel } from './spotCheckTimeLabel'
import { spotCheckWordsLabel } from './spotCheckWordsLabel'
import { tokensDetailLabel } from './tokensDetailLabel'
import { tokensLabel } from './tokensLabel'

export function CostTableRow({ row }: CostTableRowProps) {
  return (
    <tr>
      <th
        scope="row"
        className="w-52 py-3 pr-4 text-left align-top text-sm font-medium"
      >
        {row.title}
      </th>
      <CostCell primary={formatDuration(row.audioSeconds)} />
      <CostCell
        primary={asrSpeedLabel(row)}
        secondary={`${shortModelName(row.asrModel)}, local`}
        title={row.asrModel}
      />
      <CostCell
        primary={tokensLabel(row)}
        secondary={tokensDetailLabel(row)}
        title={row.correctionModel ?? undefined}
      />
      <CostCell
        primary={reliabilityLabel(row)}
        secondary={spotCheckWordsLabel(row)}
      />
      <CostCell
        primary={`${String(row.decidedEdits)} of ${String(row.proposedEdits)} edits`}
        secondary={spotCheckTimeLabel(row)}
      />
    </tr>
  )
}
