import { principalOutput } from './principalOutput.ts'

export const meOutput = principalOutput.extend({
  realPrincipal: principalOutput.optional(),
  effectivePrincipal: principalOutput.optional(),
})
