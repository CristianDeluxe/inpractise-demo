import type { AccessTokenAccessor } from '../api/AccessTokenAccessor.ts'

export type HttpClientOptions = {
  baseUrl: string
  getAccessToken: AccessTokenAccessor
  fetch?: typeof fetch
}
