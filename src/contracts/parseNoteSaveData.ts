import { z } from 'zod'

export function parseNoteSaveData(input: unknown) {
  return z
    .strictObject({ noteId: z.uuid(), createdAt: z.string().min(1) })
    .parse(input)
}
