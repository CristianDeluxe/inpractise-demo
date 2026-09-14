import type { ResearchRequest } from '@/api/ResearchRequest.ts'

export type BackendCall = {
  authorization: string
  correlationId: string
  payload: ResearchRequest
}
