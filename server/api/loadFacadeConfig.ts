import type { FacadeConfig } from './FacadeConfig.ts'

export function loadFacadeConfig(): FacadeConfig {
  return {
    researchUrl: process.env['RESEARCH_URL'] ?? '',
    fetch: globalThis.fetch,
    limit: 60,
    windowSeconds: 60,
    maxPrincipals: 10000,
    now: Date.now,
  }
}
