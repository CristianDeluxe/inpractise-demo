import type { ApiErrorCode } from '../ApiErrorCode.ts'
import type { ResearchRequest } from '../ResearchRequest.ts'
import { mapNotFound } from './mapNotFound.ts'

/**
 * A 404 is ambiguous by itself: `read`, `provenance` and `note_delete` all
 * fail closed on a missing or unauthorized row, but the honest word for the
 * caller differs. The action, not the server's shared not-found code, decides
 * which one applies; a `note_save` 404 is the passage, not the note.
 */
export function mapHttpStatus(
  status: number,
  action?: ResearchRequest['action'],
): ApiErrorCode {
  switch (status) {
    case 401:
      return 'invalid_session'
    case 403:
      return 'forbidden'
    case 404:
      return mapNotFound(action)
    case 422:
      return 'bad_input'
    case 429:
      return 'allowance_exhausted'
    case 502:
      return 'invalid_model_answer'
    case 503:
      return 'dependency_failure'
    default:
      return 'http_error'
  }
}
