import { setTimeout } from 'node:timers/promises'
import { assertEmbeddingRetry } from './assertEmbeddingRetry.ts'
import type { EmbeddingBatchResult } from './EmbeddingBatchResult.ts'
import { parseEmbeddingResponse } from './parseEmbeddingResponse.ts'

export async function embedBatch(
  texts: string[],
  apiKey: string,
): Promise<EmbeddingBatchResult> {
  if (!apiKey) throw new Error('Missing variables: OPENAI_API_KEY')
  if (!texts.length || texts.length > 16)
    throw new Error('Embedding batch must contain 1 to 16 texts')
  for (let attempt = 0; attempt < 3; attempt++) {
    let response: Response
    try {
      response = await fetch('https://api.openai.com/v1/embeddings', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'text-embedding-3-small',
          dimensions: 1536,
          encoding_format: 'float',
          input: texts,
        }),
        signal: AbortSignal.timeout(10000),
      })
    } catch {
      if (attempt === 2)
        throw new Error('Embedding request unavailable after three attempts')
      await setTimeout(250 * 2 ** attempt + Math.random() * 100)
      continue
    }
    if (!response.ok) {
      await assertEmbeddingRetry(response, attempt)
      await setTimeout(250 * 2 ** attempt + Math.random() * 100)
      continue
    }
    return parseEmbeddingResponse(await response.json(), texts.length)
  }
  throw new Error('Embedding attempts exhausted')
}
