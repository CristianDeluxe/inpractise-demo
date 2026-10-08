import { z } from 'zod'
import { EditCategorySchema } from './EditCategorySchema.ts'

/** Forced-JSON contract shared by both providers. */
export const CorrectionResponseSchema = z.object({
  paragraphs: z.array(
    z.object({
      paragraphId: z.string(),
      text: z.string(),
      edits: z.array(
        z.object({
          from: z.string(),
          to: z.string(),
          category: EditCategorySchema,
          reason: z.string(),
          confidence: z.number(),
        }),
      ),
    }),
  ),
})
