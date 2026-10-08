import { z } from 'zod'

export const MaxLaneEnvelopeSchema = z.object({
  answer: z.unknown(),
  usage: z.object({
    input_tokens: z.number(),
    output_tokens: z.number(),
  }),
})
