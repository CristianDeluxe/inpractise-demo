import { ApiError } from './ApiError.ts'
import { sseFrame } from './sseFrame.ts'

/**
 * A failure after the headers have been sent, as the one `error` event the
 * client maps back to a status. Anything that is not an ApiError is reported
 * as a dependency failure, so a bug is never rendered as an answer.
 */
export function errorFrame(cause: unknown, requestId: string): Uint8Array {
  const error =
    cause instanceof ApiError
      ? cause
      : new ApiError('dependency_failure', 'Unhandled failure', true)
  return sseFrame('error', {
    error: {
      code: error.code,
      message: error.message,
      retryable: error.retryable,
    },
    requestId,
  })
}
