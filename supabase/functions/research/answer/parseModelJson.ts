import type { z } from 'zod'
import { ApiError } from '../../_shared/http/ApiError.ts'

/** A malformed reply is a model failure, never a refusal shown to the reader. */
export function parseModelJson<T>(schema: z.ZodType<T>, content: string): T {
  let parsed: unknown
  try {
    parsed = JSON.parse(content)
  } catch {
    throw new ApiError('invalid_model_answer', 'Answer was not JSON')
  }
  const result = schema.safeParse(parsed)
  if (!result.success)
    throw new ApiError(
      'invalid_model_answer',
      `Answer failed its schema: ${result.error.issues
        .map((issue) => `${issue.path.join('.') || 'root'}/${issue.code}`)
        .slice(0, 4)
        .join(', ')}`,
    )
  return result.data
}
