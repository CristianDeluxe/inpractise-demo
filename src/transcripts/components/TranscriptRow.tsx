import { Link } from '@tanstack/react-router'
import { displayTitle } from '../episodes/displayTitle'
import { formatCount } from '../formatters/formatCount'
import { formatDuration } from '../formatters/formatDuration'
import { formatReliability } from '../formatters/formatReliability'
import { Badge } from './Badge'
import { ReadExcerptsLink } from './ReadExcerptsLink'
import { ReviewedProgress } from './ReviewedProgress'
import type { TranscriptRowProps } from './TranscriptRowProps'

export function TranscriptRow({ item }: TranscriptRowProps) {
  const { source, reliability } = item
  return (
    <tr className="align-top">
      <th scope="row" className="py-4 pr-4 text-left font-normal">
        <Link
          to="/app/transcripts/$id"
          params={{ id: item.id }}
          className="line-clamp-2 block font-serif text-lg font-semibold underline-offset-4 hover:underline"
        >
          {displayTitle(item.id, source.title)}
        </Link>
      </th>
      <td className="py-4 pr-4 font-mono text-sm">
        {formatDuration(source.durationSeconds)}
      </td>
      <td className="py-4 pr-4">
        <Badge tone={reliability ? 'success' : 'neutral'}>
          {reliability ? 'AI final ready' : 'AI pass not run'}
        </Badge>
      </td>
      <td className="py-4 pr-4 font-mono text-sm">
        {reliability ? formatReliability(reliability.reliability) : '-'}
      </td>
      <td className="py-4 pr-4 font-mono text-sm">
        {reliability ? formatCount(reliability.spotCheckWords) : '-'}
      </td>
      <td className="py-4 pr-4 text-sm">
        {item.hasCorrection ? (
          <ReviewedProgress reviewed={item.reviewed} edits={item.edits} />
        ) : (
          <span className="text-muted-foreground">Nothing to check yet</span>
        )}
      </td>
      <td className="py-4 text-sm">
        <div className="flex flex-wrap gap-x-4 gap-y-1">
          <Link
            to="/app/transcripts/$id/report"
            params={{ id: item.id }}
            className="underline underline-offset-4"
          >
            Report
          </Link>
          <ReadExcerptsLink id={item.id} />
        </div>
      </td>
    </tr>
  )
}
