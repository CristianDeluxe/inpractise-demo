import { z } from 'zod'
import { viewAsSchema } from '../api/viewAsSchema.ts'

export const searchInput = z.strictObject({
  viewAs: viewAsSchema.optional(),
  query: z.string().min(1).max(2000),
  company: z.string().max(80).optional(),
  limit: z.number().int().min(1).max(10).optional(),
})
