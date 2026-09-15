import { corsHeaders } from '../_shared/http/corsHeaders.ts'
import { errorFrame } from '../_shared/http/errorFrame.ts'
import { sseFrame } from '../_shared/http/sseFrame.ts'

/**
 * Progress as it happens, then one terminal event. Stages carry counts and
 * phase names; the answer is published only by `result`, after generation, the
 * authorization recheck and envelope assembly have all completed. A failure
 * after the headers is an `error` event, never a truncated success: end of
 * stream on its own is not a result.
 */
export function streamStages(
  run: AsyncGenerator<unknown, unknown>,
  envelope: {
    action: string
    orgId: string
    buildId: string
    requestId: string
  },
): Response {
  const { action, orgId, buildId, requestId } = envelope
  const body = new ReadableStream<Uint8Array>({
    async start(controller) {
      try {
        let step = await run.next()
        while (!step.done) {
          controller.enqueue(sseFrame('stage', step.value))
          step = await run.next()
        }
        controller.enqueue(
          sseFrame('result', { action, data: step.value, buildId, requestId }),
        )
      } catch (cause) {
        controller.enqueue(errorFrame(cause, requestId))
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
