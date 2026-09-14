import { z } from 'zod'

/**
 * Only downgrade requests are expressible: neither reviewer access nor premium
 * entitlement can be granted through this input. Identity still comes from Auth.
 */
export const ViewAsSchema = z.strictObject({
  role: z.literal('member').optional(),
  premium: z.literal(false).optional(),
})
