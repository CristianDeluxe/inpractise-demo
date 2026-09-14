import { parseActionData } from '@/api/parseActionData.ts'
import type { ResearchRequest } from '@/api/ResearchRequest.ts'
import { parseAskData } from '@/contracts/parseAskData.ts'
import { parseMeData } from '@/contracts/parseMeData.ts'
import { parseReadData } from '@/contracts/parseReadData.ts'
import { parseSearchData } from '@/contracts/parseSearchData.ts'
import { FacadeError } from './FacadeError.ts'
import { paginateDocuments } from './paginateDocuments.ts'

/**
 * Validate evidence against the original action before exposing its HTTP shape.
 * Passage output deliberately omits `isCurrentRevision`: that flag can change
 * without a revision change and would invalidate identity-based strong ETags.
 */
export function projectResponse(
  payload: ResearchRequest,
  data: unknown,
  input: unknown,
) {
  switch (payload.action) {
    case 'list':
      return paginateDocuments(data, input)
    case 'read': {
      const read = parseActionData(payload, data, parseReadData)
      return {
        citation: read.citation,
        section: read.section,
        neighbourIds: read.neighbourIds,
      }
    }
    case 'search':
      return parseActionData(payload, data, parseSearchData)
    case 'ask':
      return parseActionData(payload, data, parseAskData)
    case 'me':
      return parseMeData(data)
    case 'debug':
      throw new FacadeError(
        404,
        'not_found',
        'Reviewer diagnostics are not part of v1.',
      )
    case 'provenance':
      throw new FacadeError(
        404,
        'not_found',
        'Reopening a request is not part of v1.',
      )
  }
}
