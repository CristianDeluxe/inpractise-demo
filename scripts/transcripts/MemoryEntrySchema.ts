import { z } from 'zod'
import { EditCategorySchema } from './EditCategorySchema.ts'

export const MemoryEntrySchema = z.object({
  from: z.string(),
  to: z.string(),
  category: EditCategorySchema,
  occurrences: z.number(),
  sources: z.array(z.string()),
  lastSeenAt: z.string(),
})
