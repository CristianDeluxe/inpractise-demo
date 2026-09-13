import type { AccessTokenAccessor } from './AccessTokenAccessor.ts'

export type ResearchClient = {
  readonly endpoint: string
  readonly publishableKey: string
  readonly getAccessToken: AccessTokenAccessor
  readonly fetch: typeof globalThis.fetch
  sequence: number
}
