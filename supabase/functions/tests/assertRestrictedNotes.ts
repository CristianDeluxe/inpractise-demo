import type { handleNoteList } from '../research/actions/handleNoteList.ts'

/**
 * Under a basic view the basic note carries its re-read quotation and the
 * premium note keeps its text but no evidence: listed, never leaked.
 */
export function assertRestrictedNotes(
  notes: Awaited<ReturnType<typeof handleNoteList>>['notes'],
  premiumNoteId: string,
) {
  const [basic, premium] = notes
  if (notes.length !== 2 || !basic || !premium)
    throw new Error('Notes were dropped')
  if (basic.citation === null) throw new Error('Basic evidence was not re-read')
  if (premium.citation !== null)
    throw new Error('Premium evidence leaked into a restricted listing')
  if (premium.note !== 'Worth keeping.' || premium.noteId !== premiumNoteId)
    throw new Error('The note itself must remain listed without evidence')
}
