import { ApiError } from './ApiError.ts'
import { parseEnvelope } from './parseEnvelope.ts'
import { parseHttpError } from './parseHttpError.ts'
import { readResponseBody } from './readResponseBody.ts'
import type { ResearchClient } from './ResearchClient.ts'
import type { ResearchRequest } from './ResearchRequest.ts'
import type { ResponseEnvelope } from './ResponseEnvelope.ts'
import { throwIfCancelled } from './throwIfCancelled.ts'

/**
 * Read the current session token for each call and send it only to the fixed
 * research endpoint, without cookies, redirects or cached responses. Cancellation
 * is checked after token lookup, response arrival and body reading so late work
 * cannot be delivered as a successful response.
 */
export async function performRequest<T, A extends ResearchRequest['action']>(
  client: ResearchClient,
  request: ResearchRequest & { action: A },
  validate: (input: unknown) => T,
  signal: AbortSignal,
): Promise<ResponseEnvelope<T, A>> {
  let token: string | null
  try {
    token = await client.getAccessToken()
  } catch {
    throw new ApiError(
      'invalid_session',
      'The current session could not be read.',
    )
  }
  throwIfCancelled(signal)
  if (!token?.trim())
    throw new ApiError(
      'invalid_session',
      'Sign in to access the research corpus.',
    )
  let response: Response
  try {
    response = await client.fetch(client.endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
        apikey: client.publishableKey,
      },
      body: JSON.stringify(request),
      signal,
      redirect: 'error',
      cache: 'no-store',
      credentials: 'omit',
    })
  } catch {
    throw new ApiError(
      'network',
      'The research service could not be reached.',
      { retryable: true },
    )
  }
  throwIfCancelled(signal)
  const body = await readResponseBody(response)
  throwIfCancelled(signal)
  if (!response.ok) throw parseHttpError(response.status, body)
  return parseEnvelope(body, request.action, validate)
}
