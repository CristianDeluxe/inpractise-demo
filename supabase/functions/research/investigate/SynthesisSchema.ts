import { z } from 'zod'
import { ProviderAnswerSchema } from '../answer/ProviderAnswerSchema.ts'

/**
 * The grounded-claim contract of a standalone ask, plus one status per
 * sub-question so the reader sees which parts of the question the corpus
 * could establish. Coverage of every planned index is checked after parsing.
 */
export const SynthesisSchema = ProviderAnswerSchema.extend({
  subQuestions: z
    .array(
      z.strictObject({
        index: z.number().int().min(1).max(4),
        status: z.enum(['answered', 'partial', 'not_found']),
      }),
    )
    .max(4),
})
