import { RecentRequestDiagnostics } from './RecentRequestDiagnostics'
import type { RecentRequestRowProps } from './RecentRequestRowProps'

/** What an opened row shows: the revisions read, per side for a compare. */
export function RecentRequestDetail({ request }: RecentRequestRowProps) {
  const { diagnostics } = request
  if (diagnostics === null)
    return (
      <p className="text-sm">
        No diagnostic record was written for this request.
      </p>
    )
  if ('filings' in diagnostics)
    return (
      <div className="grid gap-6 md:grid-cols-2">
        <RecentRequestDiagnostics
          label="Interviews"
          diagnostics={diagnostics.interviews}
        />
        <RecentRequestDiagnostics
          label="Filings"
          diagnostics={diagnostics.filings}
        />
      </div>
    )
  return <RecentRequestDiagnostics diagnostics={diagnostics} />
}
