import type { IncomingMessage } from 'node:http'
import { describe, expect, it } from 'vitest'
import { isLoopbackRequest } from '../../server/lab/isLoopbackRequest.ts'
import { labRequestFixture } from './labRequestFixture.ts'

describe('isLoopbackRequest', () => {
  it('answers a browser on this machine', () => {
    for (const host of ['localhost:5173', '127.0.0.1:5173', '[::1]:5173'])
      expect(isLoopbackRequest(labRequestFixture('127.0.0.1', { host }))).toBe(
        true,
      )
    expect(
      isLoopbackRequest(
        labRequestFixture('::ffff:127.0.0.1', { host: 'localhost' }),
      ),
    ).toBe(true)
  })

  it('refuses remote peers, foreign hosts and proxied requests', () => {
    const local = { host: 'localhost:5173' }
    expect(isLoopbackRequest(labRequestFixture('192.168.1.20', local))).toBe(
      false,
    )
    expect(isLoopbackRequest(labRequestFixture(undefined, local))).toBe(false)
    expect(
      isLoopbackRequest(
        labRequestFixture('127.0.0.1', { host: 'evil.example:5173' }),
      ),
    ).toBe(false)
    expect(
      isLoopbackRequest(
        labRequestFixture('127.0.0.1', {
          ...local,
          'x-forwarded-for': '203.0.113.9',
        }),
      ),
    ).toBe(false)
    expect(
      isLoopbackRequest(
        labRequestFixture('127.0.0.1', { ...local, forwarded: 'for=1.2.3.4' }),
      ),
    ).toBe(false)
    expect(
      isLoopbackRequest({ socket: {}, headers: {} } as IncomingMessage),
    ).toBe(false)
  })
})
