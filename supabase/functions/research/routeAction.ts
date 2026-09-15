import { handleAsk } from './actions/handleAsk.ts'
import { handleCompare } from './actions/handleCompare.ts'
import { handleList } from './actions/handleList.ts'
import { handleMe } from './actions/handleMe.ts'
import { handleRead } from './actions/handleRead.ts'
import { handleSearch } from './actions/handleSearch.ts'
import { effectivePrincipal } from './effectivePrincipal.ts'
import { isRecordRequest } from './isRecordRequest.ts'
import type { Principal } from './Principal.ts'
import type { ResearchRequest } from './ResearchRequest.ts'
import { routeRecordAction } from './routeRecordAction.ts'

/**
 * Apply viewing restrictions once before dispatch so every evidence path sees
 * the same effective privileges. Only `me` also receives the real principal,
 * allowing the UI to explain the downgrade without changing database identity.
 * Actions over the caller's own records continue in routeRecordAction.
 */
export async function routeAction(
  realPrincipal: Principal,
  request: ResearchRequest,
): Promise<unknown> {
  const principal = effectivePrincipal(realPrincipal, request.viewAs)
  if (isRecordRequest(request)) return routeRecordAction(principal, request)
  switch (request.action) {
    case 'me':
      return await handleMe(principal, realPrincipal)
    case 'list':
      return await handleList(principal, request.company, request.kind)
    case 'read':
      return await handleRead(principal, {
        documentId: request.documentId,
        revisionId: request.revisionId,
        passageId: request.passageId,
      })
    case 'search':
      return await handleSearch(
        principal,
        request.query,
        request.company,
        request.limit ?? 10,
      )
    case 'ask':
      return await handleAsk(
        principal,
        request.query,
        request.company,
        request.history,
      )
    case 'compare':
      return await handleCompare(principal, {
        company: request.company,
        topic: request.topic,
      })
  }
}
