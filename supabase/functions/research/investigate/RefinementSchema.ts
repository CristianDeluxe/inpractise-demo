import { z } from 'zod'
import { querySchema } from '../fields/querySchema.ts'

/** Either one reformulation, named by the sub-question it replaces, or an
 * explicit refusal. Anything else is a model failure. */
export const RefinementSchema = z.union([
  z.strictObject({ index: z.null() }),
  z.strictObject({
    index: z.number().int().min(1).max(4),
    question: querySchema,
  }),
])
