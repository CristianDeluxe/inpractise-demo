import { ApiError } from '../../_shared/http/ApiError.ts'

/**
 * A transport failure reaching the provider is retryable and says nothing
 * about the evidence. Keeping the mapping here lets the caller hold one
 * try/finally around the whole deadline instead of two.
 */
export async function requestGeneration(
  url: string,
  init: RequestInit,
): Promise<Response> {
  try {
    return await fetch(url, init)
  } catch {
    throw new ApiError('dependency_failure', 'Generation unavailable', true)
  }
}
