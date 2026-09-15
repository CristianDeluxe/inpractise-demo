import type { z } from 'zod'
import type { savedNoteSchema } from './savedNoteSchema'

export type SavedNote = z.infer<typeof savedNoteSchema>
