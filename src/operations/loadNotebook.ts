import { noteList } from '@/api/noteList'
import type { NoteListRequest } from '@/api/NoteListRequest'
import { parseNoteListData } from '@/contracts/parseNoteListData'
import type { BrowserRuntime } from '@/runtime/BrowserRuntime'

export async function loadNotebook(
  runtime: BrowserRuntime,
  args: NoteListRequest,
  signal: AbortSignal,
) {
  return noteList(runtime.client, args, parseNoteListData, { signal })
}
