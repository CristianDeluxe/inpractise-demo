import type { PendingRequestProps } from './PendingRequestProps'
import { Spinner } from './Spinner'

export function PendingRequest({ cancel }: PendingRequestProps) {
  return (
    <div
      role="status"
      className="my-4 flex min-h-32 flex-col items-center justify-center gap-3 text-sm"
    >
      <Spinner />
      <span className="sr-only">Loading</span>
      <button
        type="button"
        onClick={cancel}
        className="text-xs text-muted-foreground underline underline-offset-4 hover:text-foreground"
      >
        Cancel
      </button>
    </div>
  )
}
