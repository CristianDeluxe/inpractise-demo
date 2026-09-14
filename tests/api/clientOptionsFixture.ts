import type { HttpClientOptions } from '@/http-api/HttpClientOptions.ts'
import { facadeFixture } from './facadeFixture.ts'
import { tokenFixture } from './tokenFixture.ts'

export function clientOptionsFixture(): HttpClientOptions {
  const { handle } = facadeFixture()
  return {
    baseUrl: 'http://localhost',
    getAccessToken: () => tokenFixture().slice(7),
    fetch: async (url, init) => handle(new Request(url, init)),
  }
}
