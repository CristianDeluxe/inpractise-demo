import { z } from 'zod'

export async function assertEmbeddingRetry(
  response: Response,
  attempt: number,
): Promise<void> {
  let body: unknown = null
  try {
    body = await response.json()
  } catch {
    /* A malformed provider error remains an HTTP failure. */
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
