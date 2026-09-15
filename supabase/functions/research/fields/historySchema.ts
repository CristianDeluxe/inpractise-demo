import { z } from 'zod'
import { querySchema } from './querySchema.ts'

/**
 * The chat's recent turns, sent with a follow-up so it can be rewritten into a
 * standalone question. Three turns bound the rewrite prompt; nothing here is
 * stored, and none of it reaches retrieval or generation directly.
 */
export const historySchema = z
  .array(
    z.strictObject({
      question: querySchema,
      answer: z.string().min(1).max(2_000),
    }),
  )
  .max(3)
