import { z } from 'zod'
import { documentSchema } from './documentSchema'

export function parseListData(input: unknown) {
  return z.strictObject({ items: z.array(documentSchema).max(10) }).parse(input)
}
