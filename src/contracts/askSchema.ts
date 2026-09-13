import { z } from 'zod'
import { citationSchema } from './citationSchema'

export const askSchema = z.strictObject({
  status: z.enum(['answered', 'partial', 'conflict', 'not_found']),
  claims: z
    .array(
      z.strictObject({
        text: z.string().min(1).max(500),
        citationIds: z.array(z.string().min(1)).min(1),
      }),
    )
    .max(4),
  missingEvidence: z.array(z.string()),
  citations: z.array(citationSchema),
  mode: z.enum(['hybrid', 'lexical_only']),
  candidateCount: z.number().int().nonnegative(),
})
