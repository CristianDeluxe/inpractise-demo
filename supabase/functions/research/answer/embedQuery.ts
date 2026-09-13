import { ApiError } from '../../_shared/http/ApiError.ts'
import { requireEnv } from '../requireEnv.ts'

/**
 * Returns null rather than throwing when embedding is unavailable: search then
 * runs in a visible lexical_only mode instead of pretending to be hybrid.
 */
export async function embedQuery(query: string): Promise<number[] | null> {
  const controller = new AbortController()
  const timer = setTimeout(() => {
    controller.abort()
  }, 4_000)
  try {
    const response = await fetch('https://api.openai.com/v1/embeddings', {
      method: 'POST',
      signal: controller.signal,
      headers: {
        authorization: `Bearer ${requireEnv('OPENAI_API_KEY')}`,
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        model: 'text-embedding-3-small',
        input: query,
      }),
    })
    if (!response.ok) return null
    const body = (await response.json()) as {
      data?: { embedding?: number[] }[]
    }
    const embedding = body.data?.[0]?.embedding
    if (!embedding || embedding.length !== 1_536) return null
    return embedding
  } catch (cause) {
    if (cause instanceof ApiError) throw cause
    return null
  } finally {
    clearTimeout(timer)
  }
}
