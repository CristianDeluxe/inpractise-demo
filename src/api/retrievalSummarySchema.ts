import { z } from 'zod'

/** What one investigation retrieval step found and kept, in counts;
 * identifiers only when the endpoint discloses them to this principal. */
export const retrievalSummarySchema = z.strictObject({
  mode: z.enum(['hybrid', 'lexical_only']),
  candidateCount: z.number().int().nonnegative(),
  selectedCount: z.number().int().nonnegative(),
  suppliedCount: z.number().int().nonnegative(),
  selectedTokens: z.number().int().nonnegative(),
  candidateAt10: z.array(z.string().min(1)).max(10).optional(),
  selectedIds: z.array(z.string().min(1)).max(10).optional(),
})
