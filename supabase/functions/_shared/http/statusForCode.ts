import type { ApiErrorCode } from './ApiErrorCode.ts'
import { apiErrorStatuses } from './apiErrorStatuses.ts'

export function statusForCode(code: ApiErrorCode): number {
  return apiErrorStatuses[code]
}
