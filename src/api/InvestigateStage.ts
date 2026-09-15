import type { z } from 'zod'
import type { investigateStageSchema } from './investigateStageSchema.ts'

export type InvestigateStage = z.infer<typeof investigateStageSchema>
