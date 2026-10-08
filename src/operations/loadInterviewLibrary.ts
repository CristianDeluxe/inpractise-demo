import { isInterviewKind } from '@/contracts/isInterviewKind'
import type { BrowserRuntime } from '@/runtime/BrowserRuntime'
import { loadLibrary } from './loadLibrary'

/**
 * The authorized list with everything but the public interviews removed. The
 * database already hides the rest from readers; this filter is a second,
 * client-side guard, not the boundary.
 */
export async function loadInterviewLibrary(
  runtime: BrowserRuntime,
  args: undefined,
  signal: AbortSignal,
) {
  const response = await loadLibrary(runtime, args, signal)
  return {
    ...response,
    data: {
      ...response.data,
      items: response.data.items.filter((document) =>
        isInterviewKind(document.kind),
      ),
    },
  }
}
