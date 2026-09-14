import { z } from 'zod'

export const problemSchema = z.strictObject({
  type: z.string().min(1),
  title: z.string(),
  status: z.number().int().min(400).max(599),
  detail: z.string(),
  code: z.string().min(1),
  retryable: z.boolean(),
  requestId: z.string().min(1),
  correlationId: z.string().min(1),
})
