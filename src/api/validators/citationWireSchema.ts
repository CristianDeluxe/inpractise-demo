import { z } from 'zod'

export const citationWireSchema = z.strictObject({
  citationId: z.string().min(1),
  documentId: z.string().min(1),
  revisionId: z.string().min(1),
  passageId: z.string().min(1),
  quote: z.string().min(1),
  startChar: z.number().int().nonnegative(),
  endChar: z.number().int().nonnegative(),
  title: z.string(),
  company: z.string(),
  origin: z.enum(['synthetic', 'public']),
  kind: z.enum(['synthetic_interview', 'sec_filing', 'annual_report_pdf']),
  speaker: z.string().nullable(),
  speakerRole: z.string().nullable(),
  interviewDate: z.string().nullable(),
  publishedAt: z.string().min(1),
  sourceUrl: z.string().nullable(),
  readerPath: z.string(),
})
