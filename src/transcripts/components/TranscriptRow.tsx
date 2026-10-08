import { Link } from '@tanstack/react-router'
import { formatDuration } from '../formatters/formatDuration'
import { formatPercent } from '../formatters/formatPercent'
import { Badge } from './Badge'
import { ReviewedProgress } from './ReviewedProgress'
import type { TranscriptRowProps } from './TranscriptRowProps'

export function TranscriptRow({ item }: TranscriptRowProps) {
  const { source, stats } = item
  return (
    <tr className="align-top">
      <th scope="row" className="py-4 pr-4 text-left font-normal">
        <Link
          to="/lab/transcripts/$id"
          params={{ id: item.id }}
          className="line-clamp-2 block font-serif text-lg font-semibold underline-offset-4 hover:underline"
        >
          {source.title}
        </Link>
        <p className="meta-text">{source.channel}</p>
      </th>
      <td className="py-4 pr-4 font-mono text-sm">
        {formatDuration(source.durationSeconds)}
      </td>
      <td className="py-4 pr-4 font-mono text-sm">
        {formatPercent(stats.low, stats.words)}
      </td>
      <td className="py-4 pr-4 font-mono text-sm">
        {formatPercent(stats.medium, stats.words)}
      </td>
      <td className="py-4 pr-4">
        <Badge tone={item.hasCorrection ? 'success' : 'neutral'}>
          {item.hasCorrection ? 'corrected' : 'raw only'}
        </Badge>
      </td>
      <td className="py-4 pr-4 text-sm">
        {item.hasCorrection ? (
          <ReviewedProgress reviewed={item.reviewed} edits={item.edits} />
        ) : (
          <span className="text-muted-foreground">No edits yet</span>
        )}
      </td>
      <td className="py-4 text-sm">
        <Link
          to="/lab/transcripts/$id/report"
          params={{ id: item.id }}
          className="underline underline-offset-4"
        >
          Report
        </Link>
      </td>
    </tr>
  )
}
