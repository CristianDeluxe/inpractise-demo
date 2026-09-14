import { z } from 'zod'

export const ViewAsSchema = z.strictObject({
  role: z.literal('member').optional(),
  premium: z.literal(false).optional(),
})
