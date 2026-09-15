import type { z } from 'zod'
import type { ComparisonSchema } from './ComparisonSchema.ts'

export type Comparison = z.infer<typeof ComparisonSchema>
