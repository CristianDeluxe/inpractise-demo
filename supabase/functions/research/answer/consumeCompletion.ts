import { ApiError } from '../../_shared/http/ApiError.ts'
import { raceAbort } from './raceAbort.ts'
import { readCompletion } from './readCompletion.ts'

/**
 * Body consumption stays under the same deadline as the request that started
 * it. A transport failure while reading becomes a retryable dependency error;
 * an invalid or empty answer keeps its own code, because the two say different
 * things to the reader.
 */
export async function consumeCompletion(
  response: Response,
  signal: AbortSignal,
  onUsage: (usage: unknown) => Promise<void>,
): Promise<string> {
  try {
    return await raceAbort(readCompletion(response, onUsage), signal)
  } catch (cause) {
    if (cause instanceof ApiError) throw cause
    throw new ApiError(
      'dependency_failure',
      'Generation transport failed',
      true,
    )
  }
}
