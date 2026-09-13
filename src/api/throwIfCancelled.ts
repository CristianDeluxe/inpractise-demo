import { ApiError } from './ApiError.ts'

export function throwIfCancelled(signal: AbortSignal): void {
  if (signal.aborted)
    throw new ApiError('cancelled', 'The request was cancelled.')
}
