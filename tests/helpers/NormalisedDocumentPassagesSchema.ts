import { z } from 'zod'

export const NormalisedDocumentPassagesSchema = z.object({
  passages: z.array(z.object({ tokenCount: z.number() })),
})
