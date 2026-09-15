import { z } from 'zod'

export const compareClaimSchema = z.strictObject({
  claimId: z.string().min(1),
  text: z.string().min(1).max(500),
  quote: z.string().min(1).max(600),
  citationIds: z.array(z.string().min(1)).min(1),
})
