import type { AskRequest } from './AskRequest.ts'
import type { CompareRequest } from './CompareRequest.ts'
import type { DebugRequest } from './DebugRequest.ts'
import type { ListRequest } from './ListRequest.ts'
import type { MeRequest } from './MeRequest.ts'
import type { NoteDeleteRequest } from './NoteDeleteRequest.ts'
import type { NoteListRequest } from './NoteListRequest.ts'
import type { NoteSaveRequest } from './NoteSaveRequest.ts'
import type { ProvenanceRequest } from './ProvenanceRequest.ts'
import type { ReadRequest } from './ReadRequest.ts'
import type { SearchRequest } from './SearchRequest.ts'

export type ResearchRequest =
  | MeRequest
  | ListRequest
  | ReadRequest
  | SearchRequest
  | AskRequest
  | CompareRequest
  | DebugRequest
  | ProvenanceRequest
  | NoteSaveRequest
  | NoteListRequest
  | NoteDeleteRequest
