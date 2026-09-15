import type { z } from 'zod'
import type { askStageSchema } from './askStageSchema.ts'

export type AskStage = z.infer<typeof askStageSchema>
