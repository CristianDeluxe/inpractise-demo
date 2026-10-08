import { z } from 'zod'

export const reviewDecisionsSchema = z.array(
  z.strictObject({
    editId: z.string().min(1).max(200),
    verdict: z.enum(['accepted', 'rejected']),
    decidedAt: z.string().min(1).max(64),
  }),
)
