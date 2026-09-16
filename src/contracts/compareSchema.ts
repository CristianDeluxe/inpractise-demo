import { z } from 'zod'
import { compareSideSchema } from './compareSideSchema'

/** Strict: a key the server did not document fails the whole cross-reference. */
export const compareSchema = z.strictObject({
  company: z.string().min(1).optional(),
  topic: z.string().min(1),
  mode: z.enum(['hybrid', 'lexical_only']),
  sides: z.strictObject({
    interviews: compareSideSchema,
    filings: compareSideSchema,
  }),
  relations: z
    .array(
      z.strictObject({
        interviewClaimId: z.string().min(1),
        filingClaimId: z.string().min(1),
        relation: z.enum(['agrees', 'contradicts', 'extends']),
      }),
    )
    .max(8),
  uncovered: z.array(z.enum(['interviews', 'filings'])).max(2),
})
