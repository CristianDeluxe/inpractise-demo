import { recordActions } from './recordActions.ts'
import type { RecordRequest } from './RecordRequest.ts'
import type { ResearchRequest } from './ResearchRequest.ts'

export function isRecordRequest(
  request: ResearchRequest,
): request is RecordRequest {
  return recordActions.has(request.action)
}
