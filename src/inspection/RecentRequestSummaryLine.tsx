import { formatCount } from './formatters/formatCount'
import { formatRecordedAt } from './formatters/formatRecordedAt'
import { recentRequestColumns } from './recentRequestColumns'
import type { RecentRequestRowProps } from './RecentRequestRowProps'
import { summariseRequest } from './summariseRequest'

/** The one-line summary a reviewer scans before opening a row. */
export function RecentRequestSummaryLine({ request }: RecentRequestRowProps) {
  const summary = summariseRequest(request.diagnostics)
  return (
    <summary
      className={`${recentRequestColumns} cursor-pointer list-none items-baseline py-3 text-sm hover:bg-muted/40`}
    >
      <span
        className="font-mono text-xs text-muted-foreground"
        title={request.recordedAt}
      >
        {formatRecordedAt(request.recordedAt)}
      </span>
      <span className="font-medium">{summary.kind}</span>
      <span className="font-mono">{formatCount(summary.ranked)}</span>
      <span className="font-mono">{formatCount(summary.selected)}</span>
      <span className="font-mono">{formatCount(summary.contextTokens)}</span>
      <span className="font-mono">{formatCount(request.totalTokens)}</span>
      <span className="text-xs text-muted-foreground group-open:hidden">
        Open
      </span>
      <span className="hidden text-xs text-muted-foreground group-open:inline">
        Close
      </span>
    </summary>
  )
}
