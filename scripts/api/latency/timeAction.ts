import type { DataEnvelope } from './DataEnvelope.ts'
import type { LatencyTarget } from './LatencyTarget.ts'
import { postResearch } from './postResearch.ts'
import type { TimedAction } from './TimedAction.ts'

/** Wall-clock milliseconds from request to fully read JSON body. */
export async function timeAction(
  target: LatencyTarget,
  token: string,
  body: Record<string, unknown>,
): Promise<TimedAction> {
  const started = performance.now()
  const response = await postResearch(target, token, body)
  const envelope = (await response.json()) as DataEnvelope
  const ms = performance.now() - started
  if (!response.ok)
    throw new Error(
      `${String(body['action'])} failed with ${String(response.status)}`,
    )
  return { ms, data: envelope.data }
}
