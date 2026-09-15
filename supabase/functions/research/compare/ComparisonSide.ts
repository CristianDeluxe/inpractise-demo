import type { z } from 'zod'
import type { ComparisonSideSchema } from './ComparisonSideSchema.ts'

export type ComparisonSide = z.infer<typeof ComparisonSideSchema>
