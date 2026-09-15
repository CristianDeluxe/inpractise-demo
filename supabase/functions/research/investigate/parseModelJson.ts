import type { z } from 'zod'
import { ApiError } from '../../_shared/http/ApiError.ts'

/** A model reply that is not JSON, or JSON that fails its schema, is a model
 * failure with a named cause, never rendered prose. */
export function parseModelJson<T extends z.ZodType>(
  content: string,
  schema: T,
  what: string,
): z.infer<T> {
  let parsed: unknown
  try {
    parsed = JSON.parse(content)
  } catch {
    throw new ApiError('invalid_model_answer', `${what} was not JSON`)
  }
  const result = schema.safeParse(parsed)
  if (!result.success)
    throw new ApiError(
      'invalid_model_answer',
      `${what} failed its schema: ${result.error.issues
        .map((issue) => `${issue.path.join('.') || 'root'}/${issue.code}`)
        .slice(0, 4)
        .join(', ')}`,
    )
  return result.data
}
