import type { ResearchSession } from './ResearchSession.ts'
import { signIn } from './signIn.ts'

/**
 * Calls the same endpoint the browser calls, with the same member's token, so
 * a denial here is the denial the browser would get. One re-sign covers an
 * expired session; a second 401 is reported, never retried into a loop.
 */
export async function callResearch(
  session: ResearchSession,
  body: Record<string, unknown>,
): Promise<unknown> {
  for (let attempt = 0; attempt < 2; attempt++) {
    const response = await fetch(
      `${session.config.url}/functions/v1/research`,
      {
        method: 'POST',
        headers: {
          apikey: session.config.publishableKey,
          authorization: `Bearer ${session.token}`,
          'content-type': 'application/json',
        },
        body: JSON.stringify(body),
        signal: AbortSignal.timeout(45_000),
      },
    )
    const payload = (await response.json()) as {
      data?: unknown
      error?: { code?: string; message?: string }
    }
    if (response.ok) return payload.data
    if (response.status === 401 && attempt === 0) {
      session.token = await signIn(session.config)
      continue
    }
    throw new Error(
      `${payload.error?.code ?? 'request_failed'}: ${payload.error?.message ?? String(response.status)}`,
    )
  }
  throw new Error('unauthenticated: the research session could not be renewed')
}
