import { isInterviewKind } from '@/contracts/isInterviewKind'
import type { BrowserRuntime } from '@/runtime/BrowserRuntime'
import { loadLibrary } from './loadLibrary'

/**
 * The authorized list with filings removed. The list action filters on the
 * server by caller, not by kind, so the kind filter happens here.
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
