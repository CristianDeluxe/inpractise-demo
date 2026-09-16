import { z } from 'zod'
import { viewAsSchema } from '../api/viewAsSchema.ts'

export const documentsInput = z.strictObject({
  viewAs: viewAsSchema.optional(),
  company: z.string().max(80).optional(),
  kind: z
    .enum(['synthetic_interview', 'sec_filing', 'annual_report_pdf'])
    .optional(),
  cursor: z.string().min(1).max(2048).optional(),
  pageSize: z.number().int().min(1).max(50).optional(),
})
