import { z } from 'zod'
import { EditCategorySchema } from './EditCategorySchema.ts'

/** Entries written before the basis existed were all learned from a person. */
export const MemoryEntrySchema = z.object({
  from: z.string(),
  to: z.string(),
  category: EditCategorySchema,
  occurrences: z.number(),
  sources: z.array(z.string()),
  lastSeenAt: z.string(),
  basis: z.enum(['human', 'references']).default('human'),
})
