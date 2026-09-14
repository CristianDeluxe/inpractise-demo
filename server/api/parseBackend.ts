import { parseEnvelope } from '@/api/parseEnvelope.ts'
import type { ResearchRequest } from '@/api/ResearchRequest.ts'
import { z } from 'zod'
import { backendErrorSchema } from './backendErrorSchema.ts'
import { FacadeError } from './FacadeError.ts'

export function parseBackend(
  response: Response,
  body: unknown,
  action: ResearchRequest['action'],
) {
  if (!response.ok) {
    const parsed = backendErrorSchema.safeParse(body)
    if (!parsed.success)
      throw new FacadeError(
        response.status >= 400 ? response.status : 502,
        'dependency_failure',
        'Research returned an invalid error document.',
        true,
      )
    throw new FacadeError(
      response.status,
      parsed.data.error.code,
      parsed.data.error.message,
      {
        retryable: parsed.data.error.retryable,
        requestId: parsed.data.requestId,
      },
    )
  }
  try {
    const envelope = parseEnvelope(body, action, (data) =>
      z.record(z.string(), z.unknown()).parse(data),
    )
    const readScope = response.headers.get('x-research-org-id')
    return { ...envelope, readScope }
  } catch {
    throw new FacadeError(
      502,
      'invalid_backend_response',
      'Research returned an invalid success document.',
    )
  }
}
