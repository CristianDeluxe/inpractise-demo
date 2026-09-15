import { noteDelete } from '@/api/noteDelete'
import type { NoteDeleteRequest } from '@/api/NoteDeleteRequest'
import { parseNoteDeleteData } from '@/contracts/parseNoteDeleteData'
import type { BrowserRuntime } from '@/runtime/BrowserRuntime'

export async function deleteNote(
  runtime: BrowserRuntime,
  args: NoteDeleteRequest,
  signal: AbortSignal,
) {
  return noteDelete(runtime.client, args, parseNoteDeleteData, { signal })
}
