import { z } from 'zod'
import { problemSchema } from './problemSchema.ts'
import { responseHeaders } from './responseHeaders.ts'

export const problemResponses = Object.fromEntries(
  [400, 401, 403, 404, 405, 413, 415, 422, 429, 500, 502, 503, 504].map(
    (status) => [
      String(status),
      {
        description:
          'RFC 9457 problem; backend status/code/requestId preserved. Facade codes are documented in docs/api.md.',
        headers: {
          ...responseHeaders,
          ...(status === 429
            ? {
                'Retry-After': {
                  description:
                    'Seconds until facade quota reset; backend allowance resets are backend-owned.',
                  schema: { type: 'string' },
                },
              }
            : {}),
          ...(status === 401
            ? { 'WWW-Authenticate': { schema: { type: 'string' } } }
            : {}),
        },
        content: {
          'application/problem+json': { schema: z.toJSONSchema(problemSchema) },
        },
      },
    ],
  ),
)
