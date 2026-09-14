import { z } from 'zod'

/**
 * The span of the evidence actually selected for this answer, and how old each
 * end of it is. Optional on the wire: a deployed client that predates this
 * field must keep parsing valid responses.
 */
export const evidenceVintageOutput = z.strictObject({
  oldest: z.string().regex(/^\d{4}-\d{2}-\d{2}$/u),
  newest: z.string().regex(/^\d{4}-\d{2}-\d{2}$/u),
  oldestAgeDays: z.number().int().nonnegative(),
  newestAgeDays: z.number().int().nonnegative(),
})
