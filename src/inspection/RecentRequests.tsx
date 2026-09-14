import type { RecentRequestsProps } from './RecentRequestsProps'

export function RecentRequests({ requests }: RecentRequestsProps) {
  return (
    <section className="mb-8 rounded-lg border border-border bg-card p-6">
      <h2 className="font-sans text-xl">Your recent questions</h2>
      <p className="mt-3 text-sm text-muted-foreground">
        Each Ask writes one row against your own allowance ledger. The
        diagnostic record is what retrieval found before context selection and
        what selection kept, so a question that failed can be read as a
        retrieval miss or a selection loss rather than guessed at. Rows are
        yours alone; the database scopes them to the authenticated principal.
      </p>
      {requests.length === 0 ? (
        <p className="mt-4 text-sm">
          No requests recorded yet. Ask a question and return here.
        </p>
      ) : (
        <ul className="mt-5 space-y-4">
          {requests.map((request) => (
            <li key={request.requestId} className="border-t border-border pt-4">
              <p className="font-mono text-xs text-muted-foreground">
                {request.recordedAt} ·{' '}
                {request.totalTokens === null
                  ? 'usage unknown'
                  : `${String(request.totalTokens)} tokens generated`}
              </p>
              {request.diagnostics === null ? (
                <p className="mt-2 text-sm">
                  No diagnostic record was written for this request.
                </p>
              ) : (
                <p className="mt-2 text-sm">
                  {request.diagnostics.candidateAt10.length} candidates ranked,{' '}
                  {request.diagnostics.selectedIds.length} selected,{' '}
                  {request.diagnostics.selectedTokens} tokens of context from
                  revisions {request.diagnostics.revisionIds.join(', ')}.
                </p>
              )}
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}
