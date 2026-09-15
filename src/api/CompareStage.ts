import type { z } from 'zod'
import type { compareStageSchema } from './compareStageSchema.ts'

export type CompareStage = z.infer<typeof compareStageSchema>
