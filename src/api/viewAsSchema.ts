import { z } from 'zod'

export const viewAsSchema = z.strictObject({
  role: z.literal('member').optional(),
  premium: z.literal(false).optional(),
})
