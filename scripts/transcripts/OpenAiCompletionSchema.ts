import { z } from 'zod'

export const OpenAiCompletionSchema = z.object({
  choices: z
    .array(z.object({ message: z.object({ content: z.string() }) }))
    .min(1),
  usage: z.object({
    prompt_tokens: z.number(),
    completion_tokens: z.number(),
  }),
})
