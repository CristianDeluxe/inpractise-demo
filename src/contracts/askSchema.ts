import { z } from 'zod'
import { answerOutput } from '../http-api/answerOutput.ts'
import { citationSchema } from './citationSchema'

export const askSchema = answerOutput.extend({
  citations: z.array(citationSchema),
})
