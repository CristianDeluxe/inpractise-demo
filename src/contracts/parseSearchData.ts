import { z } from 'zod'
import { citationSchema } from './citationSchema'

export function parseSearchData(input: unknown) {
  return z
    .strictObject({
      items: z.array(citationSchema).max(10),
      mode: z.enum(['hybrid', 'lexical_only']),
      truncated: z.boolean(),
    })
    .parse(input)
}
