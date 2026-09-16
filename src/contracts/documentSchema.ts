import { z } from 'zod'

export const documentSchema = z.strictObject({
  document_id: z.string().min(1),
  revision_id: z.string().min(1),
  title: z.string(),
  company: z.string(),
  kind: z.enum(['synthetic_interview', 'sec_filing', 'annual_report_pdf']),
  origin: z.enum(['synthetic', 'public']),
  interview_date: z.string().nullable(),
  published_at: z.string().min(1),
  source_url: z.string().nullable(),
  passage_count: z.number().int().nonnegative().optional(),
})
