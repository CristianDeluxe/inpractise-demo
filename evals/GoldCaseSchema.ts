import { z } from 'zod'

export const GoldCaseSchema = z.strictObject({
  caseId: z.string().regex(/^[A-Z]\d{2}$/),
  persona: z.enum(['basic', 'premium', 'reviewer', 'other']),
  question: z.string().min(1).max(2000),
  company: z.string().min(1).max(80),
  expectedStatus: z.enum(['answered', 'partial', 'conflict', 'not_found']),
  goldIds: z.array(z.string().regex(/^[a-z0-9-]+:[A-Za-z0-9-]+$/)),
  mustNotContain: z.array(z.string().min(1)),
})
