import { formatRecordedAt } from './formatters/formatRecordedAt'
import { RecentRequestDiagnostics } from './RecentRequestDiagnostics'
import type { RecentRequestRowProps } from './RecentRequestRowProps'

export function RecentRequestRow({ request }: RecentRequestRowProps) {
  const { diagnostics, totalTokens } = request
  return (
    <li className="border-t border-border pt-4">
      <p
        title={request.recordedAt}
        className="font-mono text-xs text-muted-foreground"
      >
        {formatRecordedAt(request.recordedAt)}
      </p>
      {diagnostics === null ? (
        <p className="mt-3 text-sm">
          No diagnostic record was written for this request.
        </p>
      ) : 'filings' in diagnostics ? (
        <div className="grid gap-4 md:grid-cols-2">
          <RecentRequestDiagnostics
            label="Interviews"
            diagnostics={diagnostics.interviews}
            generatedTokens={totalTokens}
          />
          <RecentRequestDiagnostics
            label="Filings"
            diagnostics={diagnostics.filings}
            generatedTokens={totalTokens}
          />
        </div>
      ) : (
        <RecentRequestDiagnostics
          diagnostics={diagnostics}
          generatedTokens={totalTokens}
        />
      )}
    </li>
  )
}
