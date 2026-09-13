import { ApiError } from '@/api/ApiError'
import type { BrowserRuntime } from './BrowserRuntime'
import type { RequestState } from './RequestState'

export function requestFailure(
  runtime: BrowserRuntime,
  error: unknown,
): RequestState<never> {
  if (error instanceof ApiError) {
    if (error.code === 'invalid_session')
      runtime.events.dispatchEvent(new Event('invalid-session'))
    if (error.code === 'cancelled') return { status: 'cancelled' }
  }
  return { status: 'error', error }
}
