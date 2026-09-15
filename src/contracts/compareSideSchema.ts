import { z } from 'zod'
import { citationSchema } from './citationSchema'
import { compareClaimSchema } from './compareClaimSchema'

export const compareSideSchema = z.strictObject({
  status: z.enum(['answered', 'partial', 'not_found']),
  claims: z.array(compareClaimSchema).max(4),
  missingEvidence: z.array(z.string()),
  citations: z.array(citationSchema),
  candidateCount: z.number().int().nonnegative(),
})
