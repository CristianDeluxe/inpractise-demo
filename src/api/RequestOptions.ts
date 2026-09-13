import type { RequestScope } from './RequestScope.ts'

export type RequestOptions = { signal?: AbortSignal; scope?: RequestScope }
