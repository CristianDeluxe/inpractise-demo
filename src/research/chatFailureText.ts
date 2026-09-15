import { errorCopy } from '@/components/errorCopy'
import type { BrowserRuntime } from '@/runtime/BrowserRuntime'
import { requestFailure } from '@/runtime/requestFailure'

/** What the transcript says under a question that got no answer: nothing for
 * a cancellation, the mapped reason otherwise. */
export function chatFailureText(
  runtime: BrowserRuntime,
  error: unknown,
): string | undefined {
  return requestFailure(runtime, error).status === 'cancelled'
    ? undefined
    : errorCopy(error)
}
