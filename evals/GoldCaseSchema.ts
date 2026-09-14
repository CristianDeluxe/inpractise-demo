import { z } from 'zod'
import { GoldPersonaSchema } from './GoldPersonaSchema.ts'

export const GoldCaseSchema = z.strictObject({
  caseId: z.string().regex(/^[A-Z]\d{2}$/),
  persona: GoldPersonaSchema,
  question: z.string().min(1).max(2000),
  company: z.string().min(1).max(80),
  expectedStatus: z.enum(['answered', 'partial', 'conflict', 'not_found']),
  goldIds: z.array(z.string().regex(/^[a-z0-9-]+:[A-Za-z0-9-]+$/)),
  mustNotContain: z.array(z.string().min(1)),
})
