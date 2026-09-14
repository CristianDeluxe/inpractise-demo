import { z } from 'zod'
import { retrievalDiagnosticsOutput } from '../http-api/retrievalDiagnosticsOutput.ts'

export function parseProvenanceData(input: unknown) {
  return z
    .strictObject({
      requestId: z.string().min(1),
      recordedAt: z.string().min(1),
      totalTokens: z.number().int().nonnegative().nullable(),
      revisions: z.array(
        z.strictObject({
          revisionId: z.string().min(1).max(64),
          documentId: z.string().min(1).max(64).nullable(),
          current: z.boolean(),
        }),
      ),
      diagnostics: retrievalDiagnosticsOutput.nullable().optional(),
    })
    .parse(input)
}
