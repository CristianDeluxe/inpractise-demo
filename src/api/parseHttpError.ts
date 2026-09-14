import { z } from 'zod'
import { ApiError } from './ApiError.ts'
import type { ErrorEnvelope } from './ErrorEnvelope.ts'
import { mapHttpStatus } from './mappers/mapHttpStatus.ts'
import type { ResearchRequest } from './ResearchRequest.ts'

export function parseHttpError(
  status: number,
  input: unknown,
  action?: ResearchRequest['action'],
): ApiError {
  const envelope: z.ZodSafeParseResult<ErrorEnvelope> = z
    .strictObject({
      error: z.strictObject({
        code: z.string().min(1),
        message: z.string().min(1),
        retryable: z.boolean(),
      }),
      requestId: z.string().min(1),
    })
    .safeParse(input)
  return new ApiError(
    mapHttpStatus(status, action),
    envelope.success
      ? envelope.data.error.message
      : `The research request failed (HTTP ${String(status)}).`,
    {
      retryable: envelope.success
        ? envelope.data.error.retryable
        : status === 503,
      status,
      requestId: envelope.success ? envelope.data.requestId : null,
      serverCode: envelope.success ? envelope.data.error.code : null,
    },
  )
}
