import { z } from 'zod'
import { searchOutput } from '../http-api/searchOutput.ts'
import { citationSchema } from './citationSchema'

export function parseSearchData(input: unknown) {
  return searchOutput
    .extend({ items: z.array(citationSchema).max(10) })
    .parse(input)
}
