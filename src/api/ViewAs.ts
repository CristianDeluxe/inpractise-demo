import type { z } from 'zod'
import type { viewAsSchema } from './viewAsSchema.ts'

export type ViewAs = z.infer<typeof viewAsSchema>
