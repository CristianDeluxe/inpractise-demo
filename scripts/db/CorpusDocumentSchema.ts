import { z } from 'zod'
import { PassageSchema } from './PassageSchema.ts'

export const CorpusDocumentSchema = z
  .object({
    documentId: z.string().regex(/^[a-z0-9-]{1,80}$/),
    revisionId: z.string().regex(/^[a-f0-9]{64}$/),
    title: z.string().min(1),
    company: z.string(),
    companySlug: z.string(),
    origin: z.enum(['synthetic', 'public']),
    kind: z.enum(['synthetic_interview', 'sec_filing', 'annual_report_pdf']),
    requiredTier: z.enum(['basic', 'premium']),
    sourceUrl: z.string().nullable(),
    interviewDate: z.string().nullable(),
    publishedAt: z.string(),
    configuration: z
      .object({
        parser: z.string(),
        chunker: z.string(),
        embeddingModel: z.literal('text-embedding-3-small'),
        embeddingDimensions: z.literal(1536),
      })
      .loose(),
    passages: z.array(PassageSchema).min(1),
  })
  .loose()
