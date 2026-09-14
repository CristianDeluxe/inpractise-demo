import { z } from 'zod'

export const documentsInput = z.strictObject({
  company: z.string().max(80).optional(),
  kind: z.enum(['synthetic_interview', 'sec_filing']).optional(),
  cursor: z.string().min(1).max(2048).optional(),
  pageSize: z.number().int().min(1).max(50).optional(),
})
