import type { ResearchRequest } from './ResearchRequest.ts'

/** The actions over the caller's own records rather than over the corpus. */
export const recordActions: ReadonlySet<ResearchRequest['action']> = new Set([
  'debug',
  'provenance',
  'note_save',
  'note_list',
  'note_delete',
])
