export type FacadeConfig = {
  researchUrl: string
  fetch: typeof fetch
  limit: number
  windowSeconds: number
  maxPrincipals: number
  now: () => number
  recordBackendTime?: (milliseconds: number) => void
}
