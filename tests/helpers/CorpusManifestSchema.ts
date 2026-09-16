import { z } from 'zod'

export const CorpusManifestSchema = z.object({
  documents: z.array(
    z.object({
      company: z.string(),
      kind: z.enum(['synthetic_interview', 'sec_filing', 'annual_report_pdf']),
      passageCount: z.number().int().nonnegative(),
    }),
  ),
})
