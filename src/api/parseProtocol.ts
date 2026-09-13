import type { z } from 'zod'
import { ApiError } from './ApiError.ts'

export function parseProtocol<T>(schema: z.ZodType<T>, input: unknown): T {
  const result = schema.safeParse(input)
  if (!result.success)
    throw new ApiError(
      'protocol',
      'The research service returned an invalid response.',
    )
  return result.data
}
