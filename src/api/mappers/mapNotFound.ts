import type { ApiErrorCode } from '../ApiErrorCode.ts'
import type { ResearchRequest } from '../ResearchRequest.ts'

export function mapNotFound(action?: ResearchRequest['action']): ApiErrorCode {
  if (action === 'provenance') return 'request_not_found'
  if (action === 'note_delete') return 'note_not_found'
  return 'passage_not_found'
}
