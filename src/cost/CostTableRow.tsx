import { formatDuration } from '@/transcripts/formatters/formatDuration'
import type { CostTableRowProps } from './CostTableRowProps'
import { formatReviewerMinutes } from './formatters/formatReviewerMinutes'
import { notMeasuredLabel } from './notMeasuredLabel'

export function CostTableRow({ row }: CostTableRowProps) {
  return (
    <tr className="align-top">
      <th scope="row" className="py-4 pr-4 text-left font-normal">
        {row.title}
      </th>
      <td className="py-4 pr-4 font-mono text-sm">
        {formatDuration(row.audioSeconds)}
      </td>
      <td className="py-4 pr-4 font-mono text-sm">{row.proposedEdits}</td>
      <td className="py-4 pr-4 font-mono text-sm">{row.decidedEdits}</td>
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
