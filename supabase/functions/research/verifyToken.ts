import { ApiError } from '../_shared/http/ApiError.ts'

/**
 * Validates the caller's token against GoAuth directly rather than through the
 * SDK: with a global authorization header configured, supabase-js rejects its
 * own `auth.getUser` call, and a silent 401 there would look like a denied user.
 */
export async function verifyToken(
  url: string,
  apiKey: string,
  token: string,
): Promise<string> {
  const response = await fetch(`${url}/auth/v1/user`, {
    headers: { apikey: apiKey, authorization: `Bearer ${token}` },
  })
  if (response.status === 401 || response.status === 403)
    throw new ApiError('unauthenticated', 'Invalid session')
  if (!response.ok)
    throw new ApiError('dependency_failure', 'Session check failed', true)
  const body = (await response.json()) as { id?: string }
  if (!body.id) throw new ApiError('unauthenticated', 'Invalid session')
  return body.id
}
