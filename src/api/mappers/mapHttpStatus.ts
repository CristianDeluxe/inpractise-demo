import type { ApiErrorCode } from '../ApiErrorCode.ts'

export function mapHttpStatus(status: number): ApiErrorCode {
  switch (status) {
    case 401:
      return 'invalid_session'
    case 403:
      return 'forbidden'
    case 404:
      return 'passage_not_found'
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
