import type { ApiErrorCode } from './ApiErrorCode.ts'

/**
 * The only error the handler converts into a client response. Anything else
 * reaching the boundary is a dependency failure and is reported as one, so a
 * bug can never be rendered as an answer.
 */
export class ApiError extends Error {
  readonly code: ApiErrorCode
  readonly retryable: boolean

  constructor(code: ApiErrorCode, message: string, retryable = false) {
    super(message)
    this.name = 'ApiError'
    this.code = code
    this.retryable = retryable
  }
}
