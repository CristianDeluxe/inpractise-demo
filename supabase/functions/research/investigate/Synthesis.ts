import type { z } from 'zod'
import type { SynthesisSchema } from './SynthesisSchema.ts'

export type Synthesis = z.infer<typeof SynthesisSchema>
