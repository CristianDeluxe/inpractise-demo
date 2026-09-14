import { z } from 'zod'
import { retrievalDiagnosticsOutput } from '../http-api/retrievalDiagnosticsOutput.ts'

/**
 * No evaluation report is connected here, and corpus counts alone cannot
 * establish a retrieval failure - so `report` stays null and the diagnosis stays
 * unclassified. What the reviewer does get is their own recent requests: the
 * diagnostic record each one wrote, which is measured evidence rather than a
 * summary. A row whose diagnostics were never written reads as null.
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
      recentRequests: z.array(
        z.strictObject({
          requestId: z.string().min(1),
          recordedAt: z.string().min(1),
          totalTokens: z.number().int().nonnegative().nullable(),
          diagnostics: retrievalDiagnosticsOutput.nullable(),
        }),
      ),
    })
    .parse(input)
}
