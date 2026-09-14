import type { documentsInput } from '@/http-api/documentsInput.ts'
import type { z } from 'zod'
import { cursorSchema } from './cursorSchema.ts'
import { FacadeError } from './FacadeError.ts'

export function decodeCursor(options: z.infer<typeof documentsInput>): string {
  if (!options.cursor) return ''
  try {
    const cursor = cursorSchema.parse(
      JSON.parse(Buffer.from(options.cursor, 'base64url').toString()),
    )
    if (
      cursor.company !== (options.company ?? null) ||
      cursor.kind !== (options.kind ?? null)
    )
      throw new Error('Filters changed')
    return cursor.after
  } catch {
    throw new FacadeError(
      422,
      'invalid_cursor',
      'Cursor is invalid for these filters.',
    )
  }
}
