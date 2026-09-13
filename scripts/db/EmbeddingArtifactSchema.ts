import { z } from 'zod'

export const EmbeddingArtifactSchema = z.object({
  model: z.literal('text-embedding-3-small'),
  dimensions: z.literal(1536),
  textHash: z.string(),
  vector: z.array(z.number()).length(1536),
  vectorHash: z.string(),
  inputTokens: z.number().int().nonnegative().nullable(),
})
