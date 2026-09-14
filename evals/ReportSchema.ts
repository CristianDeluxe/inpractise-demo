import { z } from 'zod'
import { CaseResultSchema } from './CaseResultSchema.ts'

/** Only the results are replayed; the stored summary is recomputed and compared. */
export const ReportSchema = z.object({
  generatedAt: z.string().min(1),
  summary: z.record(z.string(), z.unknown()),
  results: z.array(CaseResultSchema).min(1),
})
