import { RecentRequestDiagnostics } from './RecentRequestDiagnostics'
import type { RecentRequestRowProps } from './RecentRequestRowProps'

/** What an opened row shows: the retrieval record, or both sides of a compare. */
export function RecentRequestDetail({ request }: RecentRequestRowProps) {
  const { diagnostics, totalTokens } = request
  if (diagnostics === null)
    return (
      <p className="text-sm">
        No diagnostic record was written for this request.
      </p>
    )
  if ('filings' in diagnostics)
    return (
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
    )
  return (
    <RecentRequestDiagnostics
      diagnostics={diagnostics}
      generatedTokens={totalTokens}
    />
  )
}
