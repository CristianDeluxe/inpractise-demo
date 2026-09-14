import { z } from 'zod'
import { citationWireSchema } from '../api/validators/citationWireSchema.ts'
import { providerAnswerWireSchema } from '../api/validators/providerAnswerWireSchema.ts'
import { retrievalDiagnosticsOutput } from './retrievalDiagnosticsOutput.ts'

export const answerOutput = providerAnswerWireSchema.extend({
  citations: z.array(citationWireSchema),
  mode: z.enum(['hybrid', 'lexical_only']),
  candidateCount: z.number().int().nonnegative(),
  diagnostics: retrievalDiagnosticsOutput.optional(),
})
