import { z } from 'zod'
import { backendDataFixture } from './backendDataFixture.ts'

/** Offline examples only; this function does not implement authentication. */
export function fixtureResearchResponse(
  payload: unknown,
  authorization: string | undefined,
): Response {
  const request = z
    .object({ action: z.string(), query: z.string().optional() })
    .parse(payload)
  if (!authorization?.startsWith('Bearer fixture.'))
    return Response.json(
      {
        error: {
          code: 'unauthenticated',
          message: 'Offline fixture rejected the token.',
          retryable: false,
        },
        requestId: 'fixture-rejected',
      },
      { status: 401 },
    )
  if (request.query === 'provider-failure')
    return Response.json(
      {
        error: {
          code: 'dependency_failure',
          message: 'Offline fixture provider failure.',
          retryable: true,
        },
        requestId: 'fixture-provider-failure',
      },
      { status: 503 },
    )
  return Response.json(
    {
      action: request.action,
      data: backendDataFixture(request.action),
      requestId: `fixture-${request.action}`,
      buildId: 'offline-fixture',
    },
    { headers: { 'x-research-org-id': 'demo-org' } },
  )
}
