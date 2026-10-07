import type { ResearchRequest } from './ResearchRequest.ts'

/** The research request variant bound to one action. */
export type ActionRequest<A extends ResearchRequest['action']> =
  ResearchRequest & { action: A }
