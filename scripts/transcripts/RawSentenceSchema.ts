import { z } from 'zod'
import { RawTokenSchema } from './RawTokenSchema.ts'

export const RawSentenceSchema = z.object({
  text: z.string(),
  start: z.number(),
  end: z.number(),
  tokens: z.array(RawTokenSchema),
})
