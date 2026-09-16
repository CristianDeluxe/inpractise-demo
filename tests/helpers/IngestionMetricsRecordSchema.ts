import { z } from 'zod'

export const IngestionMetricsRecordSchema = z.strictObject({
  documentId: z.string(),
  company: z.string(),
  kind: z.string(),
  pagesScanned: z.number(),
  pagesRead: z.number(),
  blocks: z.number(),
  passages: z.number(),
  tokens: z.number(),
  parseMs: z.number(),
  parserVersion: z.string(),
})
