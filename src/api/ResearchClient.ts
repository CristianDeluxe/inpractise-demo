import type { AccessTokenAccessor } from './AccessTokenAccessor.ts'
import type { ViewAs } from './ViewAs.ts'

export type ResearchClient = {
  readonly endpoint: string
  readonly publishableKey: string
  readonly getAccessToken: AccessTokenAccessor
  readonly fetch: typeof globalThis.fetch
  sequence: number
  viewAs?: ViewAs
}
