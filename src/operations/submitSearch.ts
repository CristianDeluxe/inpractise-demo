import { search } from '@/api/search'
import type { SearchRequest } from '@/api/SearchRequest'
import { parseSearchData } from '@/contracts/parseSearchData'
import type { BrowserRuntime } from '@/runtime/BrowserRuntime'

export async function submitSearch(
  runtime: BrowserRuntime,
  args: SearchRequest,
  signal: AbortSignal,
) {
  return search(runtime.client, args, parseSearchData, { signal })
}
