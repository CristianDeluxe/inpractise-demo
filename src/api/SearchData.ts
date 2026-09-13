import type { SearchMode } from './SearchMode.ts'

/** T preserves backend-parsed item shapes and the corpus fingerprint once their wire layout is frozen. */
export type SearchData<T extends Record<string, unknown>> = T & {
  items: unknown[]
  mode: SearchMode
  truncated: boolean
}
