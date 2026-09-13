import type { ApiErrorCode } from './ApiErrorCode.ts'

export const apiErrorStatuses: Readonly<Record<ApiErrorCode, number>> = {
  unauthenticated: 401,
  forbidden: 403,
  not_found: 404,
  invalid_request: 422,
  allowance_exhausted: 429,
  invalid_model_answer: 502,
  dependency_failure: 503,
}
