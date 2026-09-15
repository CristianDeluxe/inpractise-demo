import { z } from 'zod'
import { savedNoteSchema } from './savedNoteSchema'

export function parseNoteListData(input: unknown) {
  return z
    .strictObject({ notes: z.array(savedNoteSchema).max(200) })
    .parse(input)
}
