import { z } from 'zod'
import { documentSchema } from '../contracts/documentSchema.ts'

export const documentsOutput = z.strictObject({
  items: z.array(documentSchema).max(50),
  nextCursor: z.string().nullable(),
})
