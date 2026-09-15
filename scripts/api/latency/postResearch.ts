import type { LatencyTarget } from './LatencyTarget.ts'

/** Sends one request exactly as the browser does: bearer token plus API key. */
export async function postResearch(
  target: LatencyTarget,
  token: string,
  body: Record<string, unknown>,
): Promise<Response> {
  return fetch(target.endpoint, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      authorization: `Bearer ${token}`,
      apikey: target.publishableKey,
    },
    body: JSON.stringify(body),
    signal: AbortSignal.timeout(60_000),
  })
}
