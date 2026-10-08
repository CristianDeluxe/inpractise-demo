import type { z } from 'zod'
import type { VideoInfoSchema } from './VideoInfoSchema.ts'

export type VideoInfo = z.infer<typeof VideoInfoSchema>
