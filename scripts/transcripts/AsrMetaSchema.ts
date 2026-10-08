import { z } from 'zod'

export const AsrMetaSchema = z.object({
  model: z.string(),
  seconds: z.number(),
})
