import { RecentRequestRow } from './RecentRequestRow'
import type { RecentRequestsProps } from './RecentRequestsProps'

export function RecentRequests({ requests }: RecentRequestsProps) {
  const head = 'px-3 pb-2 text-left'
  const numeric = 'px-3 pb-2 text-right'
  return (
    <section className="mb-8 rounded-lg border border-border bg-card p-6">
      <h2 className="font-sans text-xl">Your recent questions</h2>
      <p className="mt-3 max-w-3xl text-sm text-muted-foreground">
        One row per request against your allowance ledger. Ranked is what
        retrieval found before context selection; selected is what selection
        kept. Open a row for the revisions it read. Question text is never
        stored, and rows are scoped to you by the database.
      </p>
      {requests.length === 0 ? (
        <p className="mt-4 text-sm">
          No requests recorded yet. Ask a question and return here.
        </p>
      ) : (
        <div className="mt-6 overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead className="eyebrow text-muted-foreground">
              <tr className="border-b border-border">
                <th className={head}>Recorded</th>
                <th className={head}>Kind</th>
                <th className={numeric}>Ranked</th>
                <th className={numeric}>Selected</th>
                <th className={numeric}>Context tokens</th>
                <th className={numeric}>Generated tokens</th>
                <th className={numeric} />
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {requests.map((request) => (
                <RecentRequestRow key={request.requestId} request={request} />
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  )
}
