import { embeddingModel } from './embeddingModel.ts'
import { normaliseQuery } from './normaliseQuery.ts'

/** SHA-256 of the model and the normalised question, as lower-case hex. */
export async function queryCacheKey(query: string): Promise<string> {
  const digest = await crypto.subtle.digest(
    'SHA-256',
    new TextEncoder().encode(`${embeddingModel}\n${normaliseQuery(query)}`),
  )
  return [...new Uint8Array(digest)]
    .map((byte) => byte.toString(16).padStart(2, '0'))
    .join('')
}
