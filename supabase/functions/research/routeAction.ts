import { handleAsk } from './actions/handleAsk.ts'
import { handleDebug } from './actions/handleDebug.ts'
import { handleInvestigate } from './actions/handleInvestigate.ts'
import { handleList } from './actions/handleList.ts'
import { handleMe } from './actions/handleMe.ts'
import { handleProvenance } from './actions/handleProvenance.ts'
import { handleRead } from './actions/handleRead.ts'
import { handleSearch } from './actions/handleSearch.ts'
import { effectivePrincipal } from './effectivePrincipal.ts'
import type { Principal } from './Principal.ts'
import type { ResearchRequest } from './ResearchRequest.ts'

/**
 * Apply viewing restrictions once before dispatch so every evidence path sees
 * the same effective privileges. Only `me` also receives the real principal,
 * allowing the UI to explain the downgrade without changing database identity.
 */
export async function routeAction(
  realPrincipal: Principal,
  request: ResearchRequest,
): Promise<unknown> {
  const principal = effectivePrincipal(realPrincipal, request.viewAs)
  switch (request.action) {
    case 'me':
      return handleMe(principal, realPrincipal)
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
    case 'investigate':
      return await handleInvestigate(
        principal,
        request.question,
        request.company,
      )
    case 'debug':
      return await handleDebug(principal)
    case 'provenance':
      return await handleProvenance(principal, request.requestId)
  }
}
