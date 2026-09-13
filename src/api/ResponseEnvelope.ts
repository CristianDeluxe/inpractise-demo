import type { ResearchRequest } from './ResearchRequest.ts'

export type ResponseEnvelope<
  T,
  A extends ResearchRequest['action'] = ResearchRequest['action'],
> = { action: A; data: T; buildId: string; requestId: string }
