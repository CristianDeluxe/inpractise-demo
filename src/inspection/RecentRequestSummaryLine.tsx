import { formatCount } from './formatters/formatCount'
import { formatRecordedAt } from './formatters/formatRecordedAt'
import type { RecentRequestSummaryLineProps } from './RecentRequestSummaryLineProps'
import { summariseRequest } from './summariseRequest'

/** The one-line summary a reviewer scans before opening a row. */
export function RecentRequestSummaryLine({
  request,
  isOpen,
  onToggle,
}: RecentRequestSummaryLineProps) {
  const summary = summariseRequest(request.diagnostics)
  const numeric = 'px-3 py-3 text-right font-mono tabular-nums'
  return (
    <tr
      className="cursor-pointer hover:bg-muted/40"
      aria-expanded={isOpen}
      onClick={onToggle}
    >
      <td
        className="px-3 py-3 font-mono text-xs text-muted-foreground"
        title={request.recordedAt}
      >
        {formatRecordedAt(request.recordedAt)}
      </td>
      <td className="px-3 py-3 font-medium">{summary.kind}</td>
      <td className={numeric}>{formatCount(summary.ranked)}</td>
      <td className={numeric}>{formatCount(summary.selected)}</td>
      <td className={numeric}>{formatCount(summary.contextTokens)}</td>
      <td className={numeric}>{formatCount(request.totalTokens)}</td>
      <td className="px-3 py-3 text-right text-xs text-muted-foreground">
        {isOpen ? 'Close' : 'Open'}
      </td>
    </tr>
  )
}
