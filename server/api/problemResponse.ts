import { problemSchema } from '@/http-api/problemSchema.ts'
import { FacadeError } from './FacadeError.ts'

/**
 * Unexpected exceptions become a generic dependency problem rather than exposing
 * their message. Preserve a backend request ID when available, alongside the
 * facade correlation ID, so failures remain traceable without caching the body.
 */
export function problemResponse(
  cause: unknown,
  correlationId: string,
  headers: Headers,
): Response {
  const error =
    cause instanceof FacadeError
      ? cause
      : new FacadeError(
          503,
          'dependency_failure',
          'The facade could not complete the request.',
          true,
        )
  if (error.allow) headers.set('allow', error.allow)
  const id = error.requestId ?? headers.get('x-request-id') ?? correlationId
  headers.set('content-type', 'application/problem+json')
  headers.set('cache-control', 'no-store')
  headers.set('x-request-id', id)
  if (error.status === 401) headers.set('www-authenticate', 'Bearer')
  const body = problemSchema.parse({
    type: `urn:inpractise-demo:problem:${error.code}`,
    title: error.code.replaceAll('_', ' '),
    status: error.status,
    detail: error.message,
    code: error.code,
    retryable: error.retryable,
    requestId: id,
    correlationId,
  })
  return new Response(JSON.stringify(body), { status: error.status, headers })
}
