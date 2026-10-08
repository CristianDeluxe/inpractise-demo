import { z } from 'zod'

export const RawTokenSchema = z.object({
  text: z.string(),
  start: z.number(),
  end: z.number(),
  confidence: z.number(),
})
