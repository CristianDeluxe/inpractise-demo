import { z } from 'zod'

/**
 * Only disconnected diagnostics are supported here: no report and an unclassified
 * diagnosis. Refuse richer-looking payloads until the UI has a contract for real
 * evaluation evidence; corpus counts alone cannot establish a retrieval failure.
 */
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
