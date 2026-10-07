import type { ResearchRequest } from './ResearchRequest.ts'

/** A research request that may ask for an event-stream response. */
export type StreamableRequest = ResearchRequest & { stream?: true }
