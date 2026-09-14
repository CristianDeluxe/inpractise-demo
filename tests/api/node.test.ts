import { describe, expect, it } from 'vitest'
import { withNodeApi } from './withNodeApi.ts'

describe('Node HTTP boundary', () => {
  it('rejects malformed percent encoding with an input problem', async () => {
    await withNodeApi(async (url) => {
      const result = await fetch(
        `${url}/api/v1/documents/%ZZ/revisions/r/passages/p`,
      )
      expect(result.status).toBe(422)
    })
  })
  it('writes API responses, liveness and correlation over real HTTP', async () => {
    await withNodeApi(async (url) => {
      const health = await fetch(`${url}/api/v1/health`)
      expect(health.status).toBe(200)
      expect(await health.json()).toMatchObject({ backendChecked: false })
      const denied = await fetch(`${url}/api/v1/me`, {
        headers: { 'x-request-id': 'node-correlation' },
      })
      expect(denied.status).toBe(401)
      expect(denied.headers.get('x-request-id')).toBe('node-correlation')
    })
  })
  it('bounds the wire body and returns a correlated 413 problem', async () => {
    await withNodeApi(async (url) => {
      const response = await fetch(`${url}/api/v1/answers`, {
        method: 'POST',
        headers: { 'x-request-id': 'large-body' },
        body: 'x'.repeat(16385),
      })
      expect(response.status).toBe(413)
      expect(await response.json()).toMatchObject({
        code: 'body_too_large',
        requestId: 'large-body',
      })
    })
  })
})
