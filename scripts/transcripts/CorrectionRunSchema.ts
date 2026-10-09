import { z } from 'zod'
import { EditCategorySchema } from './EditCategorySchema.ts'

/** Reader for work/transcripts/<id>/correction.json. */
export const CorrectionRunSchema = z.object({
  transcriptId: z.string(),
  paragraphs: z.array(
    z.object({
      paragraphId: z.string(),
      text: z.string(),
      edits: z.array(
        z.object({
          id: z.string(),
          paragraphId: z.string(),
          from: z.string(),
          to: z.string(),
          category: EditCategorySchema,
          origin: z.enum(['memory', 'model', 'rule']).optional(),
          at: z.array(z.number().int().nonnegative()).optional(),
        }),
      ),
    }),
  ),
})
