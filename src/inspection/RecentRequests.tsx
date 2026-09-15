import { RecentRequestRow } from './RecentRequestRow'
import type { RecentRequestsProps } from './RecentRequestsProps'

export function RecentRequests({ requests }: RecentRequestsProps) {
  return (
    <section className="mb-8 rounded-lg border border-border bg-card p-6">
      <h2 className="font-sans text-xl">Your recent questions</h2>
      <p className="mt-3 max-w-3xl text-sm text-muted-foreground">
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
        <ul className="mt-6 space-y-6">
          {requests.map((request) => (
            <RecentRequestRow key={request.requestId} request={request} />
          ))}
        </ul>
      )}
    </section>
  )
}
