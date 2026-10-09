import { z } from 'zod'

/**
 * Where to go after signing in. Only a path on this site is accepted (one
 * leading slash, not two), so the parameter can never send someone elsewhere.
 */
export const loginSearchSchema = z.object({
  next: z
    .string()
    .regex(/^\/(?![/\\])/u)
    .optional()
    .catch(undefined),
})
