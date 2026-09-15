import { noteSave } from '@/api/noteSave'
import type { NoteSaveRequest } from '@/api/NoteSaveRequest'
import { parseNoteSaveData } from '@/contracts/parseNoteSaveData'
import type { BrowserRuntime } from '@/runtime/BrowserRuntime'

export async function saveNote(
  runtime: BrowserRuntime,
  args: NoteSaveRequest,
  signal: AbortSignal,
) {
  return noteSave(runtime.client, args, parseNoteSaveData, { signal })
}
