import type { RequestScope } from './RequestScope.ts'

/** Share one scope for a latest-result UI resource; use separate scopes for independent resources. */
export function createRequestScope(): RequestScope {
  return { sequence: 0, cancel: null }
}
