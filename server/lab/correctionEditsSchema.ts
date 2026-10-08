import { z } from 'zod'

/** Just enough of correction.json to count its edits. */
export const correctionEditsSchema = z.object({
  paragraphs: z.array(z.object({ edits: z.array(z.unknown()) })),
})
