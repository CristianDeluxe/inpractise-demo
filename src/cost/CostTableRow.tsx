import { formatDuration } from '@/transcripts/formatters/formatDuration'
import { cleanupApiCostLabel } from './cleanupApiCostLabel'
import type { CostTableRowProps } from './CostTableRowProps'
import { formatReviewerMinutes } from './formatters/formatReviewerMinutes'
import { noAiPassLabel } from './noAiPassLabel'
import { notMeasuredLabel } from './notMeasuredLabel'
import { reliabilityLabel } from './reliabilityLabel'
import { tokensLabel } from './tokensLabel'

export function CostTableRow({ row }: CostTableRowProps) {
  return (
    <tr className="align-top">
      <th scope="row" className="py-4 pr-4 text-left font-normal">
        {row.title}
      </th>
      <td className="py-4 pr-4 font-mono text-sm">
        {formatDuration(row.audioSeconds)}
      </td>
      <td className="py-4 pr-4 font-mono text-sm">
        {row.asrModel}, {row.asrSeconds} s, USD 0
      </td>
      <td className="py-4 pr-4 font-mono text-sm">{tokensLabel(row)}</td>
      <td className="py-4 pr-4 font-mono text-sm">
        {row.correctionModel === null ? noAiPassLabel : cleanupApiCostLabel}
      </td>
      <td className="py-4 pr-4 font-mono text-sm">{reliabilityLabel(row)}</td>
      <td className="py-4 pr-4 font-mono text-sm">
        {row.decidedEdits} of {row.proposedEdits}
      </td>
      <td className="py-4 pr-4 font-mono text-sm">
        {row.reviewerSeconds === undefined
          ? notMeasuredLabel
          : formatReviewerMinutes(row.reviewerSeconds / 60)}
      </td>
      <td className="py-4 font-mono text-sm">
        {row.minutesPerAudioHour === undefined
          ? notMeasuredLabel
          : formatReviewerMinutes(row.minutesPerAudioHour)}
      </td>
    </tr>
  )
}
