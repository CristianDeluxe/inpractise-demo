import type { z } from 'zod'
import type { CorrectionRunSchema } from './CorrectionRunSchema.ts'

export type ReviewableRun = z.infer<typeof CorrectionRunSchema>
