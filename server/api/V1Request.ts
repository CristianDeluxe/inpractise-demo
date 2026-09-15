import type { ResearchRequest } from '@/api/ResearchRequest.ts'

/** The research actions the v1 facade exposes; the rest are absent by design. */
export type V1Request = Extract<
  ResearchRequest,
  { action: 'list' | 'read' | 'search' | 'ask' | 'me' }
>
