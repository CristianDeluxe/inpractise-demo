import { z } from 'zod'
import type { ApiError } from './ApiError.ts'
import { mapServerCode } from './mappers/mapServerCode.ts'
import { parseHttpError } from './parseHttpError.ts'
import type { ResearchRequest } from './ResearchRequest.ts'

/**
 * A failure after the headers carries no HTTP status, so the code it reports is
 * mapped back to the status it would have been served with. The reader sees the
 * same category either way; a disconnection is never turned into an answer.
 */
export function parseStreamError(
  input: unknown,
  action: ResearchRequest['action'],
): ApiError {
  const code = z
    .object({ error: z.object({ code: z.string() }) })
    .safeParse(input)
  return parseHttpError(
    mapServerCode(code.success ? code.data.error.code : ''),
    input,
    action,
  )
}
