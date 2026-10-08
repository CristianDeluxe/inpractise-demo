import type { z } from 'zod'
import type { AsrMetaSchema } from './AsrMetaSchema.ts'

export type AsrMeta = z.infer<typeof AsrMetaSchema>
