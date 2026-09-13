import { z } from 'zod'

export function parseDebugData(input: unknown) {
  return z
    .strictObject({
      corpus: z.strictObject({
        documents: z.number().int().nonnegative(),
        revisions: z.number().int().nonnegative(),
        passages: z.number().int().nonnegative(),
        vectors: z.number().int().nonnegative(),
        report: z.null(),
        diagnosis: z.literal('unclassified'),
      }),
    })
    .parse(input)
}
