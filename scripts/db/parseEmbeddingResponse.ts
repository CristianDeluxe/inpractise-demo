import { z } from 'zod'
import type { EmbeddingBatchResult } from './EmbeddingBatchResult.ts'

export function parseEmbeddingResponse(
  input: unknown,
  count: number,
): EmbeddingBatchResult {
  const parsed = z
    .object({
      model: z.literal('text-embedding-3-small'),
      data: z.array(
        z.object({
          index: z.number().int().nonnegative(),
          embedding: z.array(z.number()).length(1536),
        }),
      ),
      usage: z
        .object({ prompt_tokens: z.number().int().nonnegative() })
        .optional(),
    })
    .safeParse(input)
  if (!parsed.success || parsed.data.data.length !== count)
    throw new Error('Invalid embedding response')
  const ordered = parsed.data.data.sort((a, b) => a.index - b.index)
  if (
    ordered.some(
      (row, index) =>
        row.index !== index || !row.embedding.some((n) => n !== 0),
    )
  )
    throw new Error('Invalid embedding indexes or zero vector')
  return {
    vectors: ordered.map((row) => row.embedding),
    inputTokens: parsed.data.usage?.prompt_tokens ?? null,
  }
}
