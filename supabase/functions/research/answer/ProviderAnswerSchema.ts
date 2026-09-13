import { z } from 'zod'

/**
 * Strict: a claim without a source, a fifth claim, or any extra key makes the
 * whole answer invalid. An invalid answer is a 502, never rendered prose.
 */
export const ProviderAnswerSchema = z.strictObject({
  status: z.enum(['answered', 'partial', 'conflict', 'not_found']),
  claims: z
    .array(
      z.strictObject({
        text: z.string().min(1).max(500),
        sources: z.array(z.number().int().min(1).max(8)).min(1),
      }),
    )
    .max(4),
  missingEvidence: z.array(z.string().max(500)).default([]),
})
