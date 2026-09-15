import { z } from 'zod'

/** One retrieval step's kept identifiers, disclosed only to an unrestricted
 * reviewer with the finished result. */
export const investigationTraceStepSchema = z.strictObject({
  step: z.number().int().positive(),
  candidateAt10: z.array(z.string().min(1)),
  selectedIds: z.array(z.string().min(1)),
  selectedTokens: z.number().int().nonnegative(),
})
