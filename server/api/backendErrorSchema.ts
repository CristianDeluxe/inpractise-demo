import { z } from 'zod'

export const backendErrorSchema = z.object({
  error: z.strictObject({
    code: z.string().regex(/^[a-z][a-z0-9_]{0,79}$/),
    message: z.string(),
    retryable: z.boolean(),
  }),
  requestId: z.string().regex(/^[\w.-]{1,128}$/),
})
