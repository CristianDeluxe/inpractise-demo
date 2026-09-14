import type { z } from 'zod'
import type { ViewAsSchema } from './ViewAsSchema.ts'

export type ViewAs = z.infer<typeof ViewAsSchema>
