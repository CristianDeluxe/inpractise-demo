import { z } from 'zod'

/**
 * One side of the model's cross-reference. The grounded-claim contract is the
 * answer's, plus a verbatim quotation per claim that the server checks against
 * the cited passage text before anything is published.
 */
export const ComparisonSideSchema = z.strictObject({
  status: z.enum(['answered', 'partial', 'not_found']),
  claims: z
    .array(
      z.strictObject({
        text: z.string().min(1).max(500),
        quote: z.string().min(1).max(600),
        sources: z.array(z.number().int().min(1).max(8)).min(1),
      }),
    )
    .max(4),
  missingEvidence: z.array(z.string().max(500)).default([]),
})
