import { ApiError } from './ApiError.ts'
import type { ResearchClient } from './ResearchClient.ts'
import type { ResearchRequest } from './ResearchRequest.ts'
import { throwIfCancelled } from './throwIfCancelled.ts'

/**
 * Reads the current session token for each call and sends it only to the fixed
 * research endpoint, without cookies, redirects or cached responses.
 * Cancellation is checked after the token lookup and again once the response
 * arrives, so late work cannot be delivered as a successful response.
 */
export async function sendResearchRequest(
  client: ResearchClient,
  request: ResearchRequest & { stream?: true },
  signal: AbortSignal,
): Promise<Response> {
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
  return response
}
