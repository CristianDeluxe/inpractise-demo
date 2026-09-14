import { z } from 'zod'
import { passageOutput } from '../http-api/passageOutput.ts'
import { citationSchema } from './citationSchema'

export function parseReadData(input: unknown) {
  return passageOutput
    .extend({ citation: citationSchema, isCurrentRevision: z.boolean() })
    .parse(input)
}
