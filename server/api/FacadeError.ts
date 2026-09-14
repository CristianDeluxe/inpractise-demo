import type { FacadeErrorDetails } from './FacadeErrorDetails.ts'

export class FacadeError extends Error {
  readonly status: number
  readonly code: string
  readonly retryable: boolean
  readonly requestId: string | undefined
  readonly allow: string | undefined
  constructor(
    status: number,
    code: string,
    message: string,
    details: boolean | FacadeErrorDetails = false,
  ) {
    super(message)
    this.allow = typeof details === 'boolean' ? undefined : details.allow
    this.status = status
    this.code = code
    this.retryable =
      typeof details === 'boolean' ? details : (details.retryable ?? false)
    this.requestId =
      typeof details === 'boolean' ? undefined : details.requestId
  }
}
