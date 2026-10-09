import type { ReviewedProgressProps } from './ReviewedProgressProps'

/** Reviewed against proposed edits, as a bar and a label at reading size. */
export function ReviewedProgress({ reviewed, edits }: ReviewedProgressProps) {
  return (
    <div className="min-w-36">
      <p className="whitespace-nowrap text-sm tabular-nums">
        {reviewed} / {edits} reviewed
      </p>
      <div
        role="progressbar"
        aria-label="Edits reviewed"
        aria-valuenow={reviewed}
        aria-valuemin={0}
        aria-valuemax={edits}
        className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-secondary"
      >
        <div
          className="h-full rounded-full bg-primary"
          style={{
            width: `${String(edits > 0 ? (reviewed / edits) * 100 : 0)}%`,
          }}
        />
      </div>
    </div>
  )
}
