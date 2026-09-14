import { z } from 'zod'

/**
 * A malformed provider error remains an HTTP failure.
 * Only transient HTTP failures may reach another attempt; insufficient quota
 * stops immediately even when reported as 429. Attempts are zero-based, with
 * attempt two the final request.
 */
export async function assertEmbeddingRetry(
  response: Response,
  attempt: number,
): Promise<void> {
  let body: unknown = null
  try {
    body = await response.json()
  } catch {
    // Continue to the HTTP status policy below.
  }
  const error = z
    .object({ error: z.object({ code: z.string() }).optional() })
    .safeParse(body)
  if (
    (error.success && error.data.error?.code === 'insufficient_quota') ||
    ![429, 500, 502, 503, 504].includes(response.status) ||
    attempt === 2
  ) {
    throw new Error(
      `Embedding provider rejected request: HTTP ${String(response.status)}`,
    )
  }
}
