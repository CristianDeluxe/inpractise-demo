import { ApiError } from './ApiError.ts'
import { parseHttpError } from './parseHttpError.ts'

/**
 * A non-JSON error body still preserves the HTTP failure category. For successful
 * responses, malformed JSON is a protocol error while a failed body transfer is
 * a retryable network error; neither becomes an empty research result.
 */
export async function readResponseBody(response: Response): Promise<unknown> {
  try {
    return (await response.json()) as unknown
  } catch (error) {
    if (!response.ok) throw parseHttpError(response.status, null)
    throw new ApiError(
      error instanceof SyntaxError ? 'protocol' : 'network',
      error instanceof SyntaxError
        ? 'The research service returned invalid JSON.'
        : 'The response body could not be received.',
      { retryable: !(error instanceof SyntaxError) },
    )
  }
}
