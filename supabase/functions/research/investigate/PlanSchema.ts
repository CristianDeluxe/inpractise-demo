import { z } from 'zod'
import { querySchema } from '../fields/querySchema.ts'

/**
 * Strict on shape, generous on count: a plan with more sub-questions than the
 * loop allows is truncated rather than rejected, so an eager model costs
 * nothing but the extra lines. Company scope is validated separately against
 * the caller-visible list.
 */
export const PlanSchema = z.strictObject({
  subQuestions: z
    .array(
      z.strictObject({
        question: querySchema,
        company: z.string().max(80).nullable().optional(),
      }),
    )
    .min(1)
    .max(16),
})
