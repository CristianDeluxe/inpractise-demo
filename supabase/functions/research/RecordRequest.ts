import type { ResearchRequest } from './ResearchRequest.ts'

/** The actions over the caller's own records rather than over the corpus. */
export type RecordRequest = Extract<
  ResearchRequest,
  { action: 'debug' | 'provenance' | 'note_save' | 'note_list' | 'note_delete' }
>
