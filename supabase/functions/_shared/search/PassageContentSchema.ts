import { z } from 'zod'

export const PassageContentSchema = z.object({
  text_content: z.string(),
  token_count: z.number().int().nonnegative(),
})
