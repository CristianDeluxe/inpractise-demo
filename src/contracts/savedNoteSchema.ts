import { z } from 'zod'
import { citationSchema } from './citationSchema'

/**
 * A note names its passage by id; the citation beside it is the server's
 * re-read of that passage as the current principal, or null when the passage
 * cannot be opened in this view. Nothing quoted here comes from the note row.
 */
export const savedNoteSchema = z.strictObject({
  noteId: z.uuid(),
  documentId: z.string().min(1),
  revisionId: z.string().min(1),
  passageId: z.string().min(1),
  question: z.string().min(1).max(2000).nullable(),
  note: z.string().min(1).max(300).nullable(),
  createdAt: z.string().min(1),
  citation: citationSchema.nullable(),
})
