import { z } from 'zod'
import { citationSchema } from './citationSchema'

export function parseReadData(input: unknown) {
  return z
    .strictObject({
      citation: citationSchema,
      section: z.string(),
      isCurrentRevision: z.boolean(),
      neighbourIds: z.array(z.string().min(1)),
    })
    .parse(input)
}
