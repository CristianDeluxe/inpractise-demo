import { z } from 'zod'

export const ReviewDecisionSchema = z.object({
  editId: z.string(),
  verdict: z.enum(['accepted', 'rejected', 'deferred']),
  decidedAt: z.string(),
})
