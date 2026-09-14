import { z } from 'zod'

export const healthOutput = z.strictObject({
  status: z.literal('ok'),
  scope: z.literal('facade-only'),
  backendChecked: z.literal(false),
})
