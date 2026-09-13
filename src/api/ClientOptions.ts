import type { AccessTokenAccessor } from './AccessTokenAccessor.ts'

export type ClientOptions = {
  baseUrl: string
  publishableKey: string
  getAccessToken: AccessTokenAccessor
  fetch?: typeof globalThis.fetch
}
