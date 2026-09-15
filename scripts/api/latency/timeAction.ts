import type { LatencyTarget } from './LatencyTarget.ts'
import { postResearch } from './postResearch.ts'

/** Wall-clock milliseconds from request to fully read JSON body. */
export async function timeAction(
  target: LatencyTarget,
  token: string,
  body: Record<string, unknown>,
): Promise<{ ms: number; data: unknown }> {
  const started = performance.now()
  const response = await postResearch(target, token, body)
  const envelope = (await response.json()) as { data?: unknown }
  const ms = performance.now() - started
  if (!response.ok)
    throw new Error(
      `${String(body['action'])} failed with ${String(response.status)}`,
    )
  return { ms, data: envelope.data }
}
