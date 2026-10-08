import { z } from 'zod'

export const MemoryExampleSchema = z.object({
  transcriptId: z.string(),
  paragraphId: z.string(),
  raw: z.string(),
  corrected: z.string(),
})
