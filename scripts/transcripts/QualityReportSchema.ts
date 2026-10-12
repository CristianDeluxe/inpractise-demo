import { z } from 'zod'

/** The part of docs/transcript-quality.json the learner reads: each judged edit's verdict. */
export const QualityReportSchema = z.object({
  episodes: z.record(
    z.string(),
    z.object({
      rows: z.array(
        z.object({
          id: z.string(),
          verdict: z.enum(['confirmed', 'contradicted', 'contested']),
        }),
      ),
    }),
  ),
})
