import { ApiError } from '../_shared/http/ApiError.ts'
import { corsHeaders } from '../_shared/http/corsHeaders.ts'
import { sseFrame } from '../_shared/http/sseFrame.ts'

/**
 * Progress as it happens, then one terminal event. Stages carry counts and
 * phase names; the payload is published only by `result`, after generation,
 * the authorization recheck and envelope assembly have all completed. A
 * failure after the headers is an `error` event, never a truncated success:
 * end of stream on its own is not a result.
 */
export function streamStages(
  orgId: string,
  action: 'ask' | 'compare',
  run: AsyncGenerator<unknown, unknown, undefined>,
  envelope: { buildId: string; requestId: string },
): Response {
  const body = new ReadableStream<Uint8Array>({
    async start(controller) {
      try {
        let step = await run.next()
        while (!step.done) {
          controller.enqueue(sseFrame('stage', step.value))
          step = await run.next()
        }
        controller.enqueue(
          sseFrame('result', { action, data: step.value, ...envelope }),
        )
      } catch (cause) {
        const error =
          cause instanceof ApiError
            ? cause
            : new ApiError('dependency_failure', 'Unhandled failure', true)
        controller.enqueue(
          sseFrame('error', {
            error: {
              code: error.code,
              message: error.message,
              retryable: error.retryable,
            },
            requestId: envelope.requestId,
          }),
        )
      } finally {
        controller.close()
      }
    },
  })
  return new Response(body, {
    status: 200,
    headers: {
      ...corsHeaders,
      'content-type': 'text/event-stream; charset=utf-8',
      'cache-control': 'no-store',
      'x-research-org-id': orgId,
    },
  })
}
