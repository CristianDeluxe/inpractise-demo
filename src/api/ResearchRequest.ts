import type { AskRequest } from './AskRequest.ts'
import type { DebugRequest } from './DebugRequest.ts'
import type { ListRequest } from './ListRequest.ts'
import type { MeRequest } from './MeRequest.ts'
import type { ReadRequest } from './ReadRequest.ts'
import type { SearchRequest } from './SearchRequest.ts'

export type ResearchRequest =
  | MeRequest
  | ListRequest
  | ReadRequest
  | SearchRequest
  | AskRequest
  | DebugRequest
