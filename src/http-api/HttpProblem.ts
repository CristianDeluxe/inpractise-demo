import type { z } from 'zod'
import type { problemSchema } from './problemSchema.ts'

export type HttpProblem = z.infer<typeof problemSchema>
