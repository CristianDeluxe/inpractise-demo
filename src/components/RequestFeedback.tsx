import { ApiError } from '@/api/ApiError'
import { Link } from '@tanstack/react-router'
import { errorCopy } from './errorCopy'
import { PendingRequest } from './PendingRequest'
import type { RequestFeedbackProps } from './RequestFeedbackProps'

export function RequestFeedback({
  state,
  cancel,
  retry,
}: RequestFeedbackProps) {
  if (state.status === 'loading') return <PendingRequest cancel={cancel} />
  if (state.status === 'cancelled')
    return (
      <p role="status" className="my-4 text-sm">
        Cancelled.{' '}
        <Link to="/login" className="underline">
          Sign in
        </Link>{' '}
        or submit a new request.
      </p>
    )
  if (state.status !== 'error') return null
  return (
    <div
      role="alert"
      className="my-4 border border-destructive/30 bg-destructive/5 p-4 text-sm"
    >
      <p>{errorCopy(state.error)}</p>
      {state.error instanceof ApiError && state.error.requestId ? (
        <p className="mt-2 break-all font-mono text-xs">
          Request: {state.error.requestId}
        </p>
      ) : null}
      <div className="mt-3 flex gap-4">
        <Link to="/login" className="underline">
          Sign in
        </Link>
        {retry && state.error instanceof ApiError && state.error.retryable ? (
          <button type="button" onClick={retry} className="underline">
            Retry
          </button>
        ) : null}
      </div>
    </div>
  )
}
