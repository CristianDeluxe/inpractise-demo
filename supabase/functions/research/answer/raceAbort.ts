import { ApiError } from '../../_shared/http/ApiError.ts'

/**
 * A provider can answer headers and then stall the body, so awaiting the body
 * without the deadline leaves the request alive far past it. Losing the race
 * is a dependency failure, never a refusal: the reader must not be told that
 * evidence is missing because generation timed out.
 */
export async function raceAbort<T>(
  work: Promise<T>,
  signal: AbortSignal,
): Promise<T> {
  let onAbort = () => {}
  const aborted = new Promise<never>((_resolve, reject) => {
    onAbort = () => {
      reject(new ApiError('dependency_failure', 'Generation timed out', true))
    }
    if (signal.aborted) onAbort()
    else signal.addEventListener('abort', onAbort, { once: true })
  })
  try {
    return await Promise.race([work, aborted])
  } finally {
    signal.removeEventListener('abort', onAbort)
  }
}
