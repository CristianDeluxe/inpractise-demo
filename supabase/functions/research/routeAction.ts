import { handleAsk } from './actions/handleAsk.ts'
import { handleDebug } from './actions/handleDebug.ts'
import { handleList } from './actions/handleList.ts'
import { handleMe } from './actions/handleMe.ts'
import { handleRead } from './actions/handleRead.ts'
import { handleSearch } from './actions/handleSearch.ts'
import type { Principal } from './Principal.ts'
import type { ResearchRequest } from './ResearchRequest.ts'

export async function routeAction(
  principal: Principal,
  request: ResearchRequest,
): Promise<unknown> {
  switch (request.action) {
    case 'me':
      return handleMe(principal)
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
      return await handleAsk(principal, request.query, request.company)
    case 'debug':
      return await handleDebug(principal)
  }
}
