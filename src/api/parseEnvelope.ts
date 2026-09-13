import { z } from 'zod'
import { ApiError } from './ApiError.ts'
import type { ResearchRequest } from './ResearchRequest.ts'
import type { ResponseEnvelope } from './ResponseEnvelope.ts'
import { parseProtocol } from './parseProtocol.ts'

export function parseEnvelope<T, A extends ResearchRequest['action']>(
  input: unknown,
  action: A,
  validate: (input: unknown) => T,
): ResponseEnvelope<T, A> {
  const envelope = parseProtocol(
    z.strictObject({
      action: z.literal(action),
      data: z.unknown(),
      buildId: z.string().min(1),
      requestId: z.string().min(1),
    }),
    input,
  )
  if (!Object.hasOwn(envelope, 'data'))
    throw new ApiError('protocol', 'The response is missing data.')
  let data: T
  try {
    data = validate(envelope.data)
  } catch (error) {
    if (error instanceof ApiError) throw error
    throw new ApiError(
      'protocol',
      'The response does not match its action schema.',
    )
  }
  return {
    action,
    data,
    buildId: envelope.buildId,
    requestId: envelope.requestId,
  }
}
