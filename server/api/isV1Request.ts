import type { ResearchRequest } from '@/api/ResearchRequest.ts'
import type { V1Request } from './V1Request.ts'

export function isV1Request(payload: ResearchRequest): payload is V1Request {
  return ['list', 'read', 'search', 'ask', 'me'].includes(payload.action)
}
