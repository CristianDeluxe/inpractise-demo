import { z } from 'zod'

export function parseNoteDeleteData(input: unknown) {
  return z.strictObject({ noteId: z.uuid() }).parse(input)
}
