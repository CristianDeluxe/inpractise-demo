import { z } from 'zod'
import { principalOutput } from './principalOutput.ts'

export const meOutput = principalOutput.extend({
  realPrincipal: principalOutput.optional(),
  effectivePrincipal: principalOutput.optional(),
  noteCount: z.number().int().nonnegative().optional(),
})
