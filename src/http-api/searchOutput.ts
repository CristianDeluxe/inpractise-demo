import { z } from 'zod'
import { citationWireSchema } from '../api/validators/citationWireSchema.ts'

export const searchOutput = z.strictObject({
  items: z.array(citationWireSchema).max(10),
  mode: z.enum(['hybrid', 'lexical_only']),
  truncated: z.boolean(),
})
