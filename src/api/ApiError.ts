import type { ApiErrorCode } from './ApiErrorCode.ts'
import type { ApiErrorDetails } from './ApiErrorDetails.ts'

export class ApiError extends Error {
  override readonly name = 'ApiError'
  readonly code: ApiErrorCode
  readonly retryable: boolean
  readonly status: number | null
  readonly requestId: string | null
  readonly serverCode: string | null
  constructor(
    code: ApiErrorCode,
    message: string,
    details: ApiErrorDetails = {},
  ) {
    super(message)
    this.code = code
    this.retryable = details.retryable ?? false
    this.status = details.status ?? null
    this.requestId = details.requestId ?? null
    this.serverCode = details.serverCode ?? null
  }
}
