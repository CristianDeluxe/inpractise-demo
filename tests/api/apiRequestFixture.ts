import { tokenFixture } from './tokenFixture.ts'

export function apiRequestFixture(
  path: string,
  init: RequestInit = {},
): Request {
  const headers = new Headers({
    authorization: tokenFixture(),
    'content-type': 'application/json',
    'x-request-id': 'caller-id',
  })
  for (const [key, value] of new Headers(init.headers)) headers.set(key, value)
  return new Request(`http://localhost/api/v1/${path}`, { ...init, headers })
}
