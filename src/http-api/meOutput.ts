import { z } from 'zod'

export const meOutput = z.strictObject({
  orgId: z.string().min(1),
  role: z.enum(['member', 'reviewer']),
  premium: z.boolean(),
})
