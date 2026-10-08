import { countVerdicts } from '../review/countVerdicts'
import { shareOfTotal } from '../review/shareOfTotal'
import type { ReviewProgressProps } from './ReviewProgressProps'

/** Decided versus pending edits for the whole episode, as one stacked bar. */
export function ReviewProgress({ edits, decisions }: ReviewProgressProps) {
  const counts = countVerdicts(edits, decisions)
  return (
    <section aria-label="Review progress" className="lab-card p-4">
      <div className="flex items-baseline justify-between gap-3">
        <h2 className="font-sans text-sm font-semibold tracking-normal">
          Episode progress
        </h2>
        <span className="font-mono text-xs tabular-nums text-muted-foreground">
          {counts.total - counts.pending} / {counts.total} decided
        </span>
      </div>
      <div
        aria-hidden="true"
        className="mt-3 flex h-1.5 overflow-hidden rounded-full bg-secondary"
      >
        <span
          className="bg-success-foreground"
          style={{ width: shareOfTotal(counts.accepted, counts.total) }}
        />
        <span
          className="bg-destructive"
          style={{ width: shareOfTotal(counts.rejected, counts.total) }}
        />
      </div>
      <dl className="mt-3 grid grid-cols-3 gap-2 text-xs">
        <div>
          <dt className="text-muted-foreground">Accepted</dt>
          <dd className="font-mono tabular-nums">{counts.accepted}</dd>
        </div>
        <div>
          <dt className="text-muted-foreground">Rejected</dt>
          <dd className="font-mono tabular-nums">{counts.rejected}</dd>
        </div>
        <div>
          <dt className="text-muted-foreground">Pending</dt>
          <dd className="font-mono tabular-nums">{counts.pending}</dd>
        </div>
      </dl>
    </section>
  )
}
