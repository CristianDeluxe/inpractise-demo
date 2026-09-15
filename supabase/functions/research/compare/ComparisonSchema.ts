import { z } from 'zod'
import { ComparisonSideSchema } from './ComparisonSideSchema.ts'

/**
 * Strict: an extra key, a fifth claim or an unknown relation invalidates the
 * whole reply. Relations name claims by their 1-based position on each side.
 */
export const ComparisonSchema = z.strictObject({
  interviews: ComparisonSideSchema,
  filings: ComparisonSideSchema,
  relations: z
    .array(
      z.strictObject({
        interviewClaim: z.number().int().min(1).max(4),
        filingClaim: z.number().int().min(1).max(4),
        relation: z.enum(['agrees', 'contradicts', 'extends']),
      }),
    )
    .max(8),
})
