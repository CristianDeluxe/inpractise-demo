import type { z } from 'zod'
import type { compareSideSchema } from './compareSideSchema'

export type CompareSide = z.infer<typeof compareSideSchema>
