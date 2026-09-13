import { ApiError } from './ApiError.ts'
import type { RequestOptions } from './RequestOptions.ts'

/** Owns cancellation and stale-result suppression for one invocation. */
export class RequestLifecycle {
  readonly controller = new AbortController()
  private active = true
  private reject: ((error: ApiError) => void) | null = null
  private readonly sequence: number
  private readonly options: RequestOptions
  constructor(sequence: number, options: RequestOptions) {
    this.sequence = sequence
    this.options = options
  }

  async start<T>(operation: () => Promise<T>): Promise<T> {
    this.options.scope?.cancel?.()
    if (this.options.scope) {
      this.options.scope.sequence = this.sequence
      this.options.scope.cancel = this.cancel
    }
    return new Promise((resolve, reject) => {
      this.reject = reject
      this.options.signal?.addEventListener('abort', this.cancel, {
        once: true,
      })
      if (this.options.signal?.aborted) {
        this.cancel()
        return
      }
      void this.execute(operation, resolve, reject)
    })
  }

  private async execute<T>(
    operation: () => Promise<T>,
    resolve: (value: T) => void,
    reject: (reason: Error) => void,
  ): Promise<void> {
    try {
      await Promise.resolve()
      if (!this.active)
        throw new ApiError('cancelled', 'The request was cancelled.')
      const result = await operation()
      if (!this.isCurrent()) return
      this.finish()
      resolve(result)
    } catch (error) {
      if (!this.isCurrent()) return
      this.finish()
      reject(
        error instanceof Error
          ? error
          : new ApiError(
              'protocol',
              'The request failed without an error object.',
            ),
      )
    }
  }

  private isCurrent(): boolean {
    return (
      this.active &&
      (!this.options.scope || this.options.scope.sequence === this.sequence)
    )
  }

  private finish(): void {
    this.active = false
    this.options.signal?.removeEventListener('abort', this.cancel)
    if (this.options.scope?.sequence === this.sequence)
      this.options.scope.cancel = null
  }

  private readonly cancel = (): void => {
    if (!this.active) return
    this.finish()
    this.controller.abort()
    this.reject?.(new ApiError('cancelled', 'The request was cancelled.'))
  }
}
