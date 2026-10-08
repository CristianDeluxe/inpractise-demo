import type { IncomingMessage } from 'node:http'
import { describe, expect, it } from 'vitest'
import { isLoopbackRequest } from '../../server/lab/isLoopbackRequest.ts'

describe('isLoopbackRequest', () => {
  it('answers this machine only', () => {
    const from = (remoteAddress: string | undefined) =>
      ({ socket: { remoteAddress } }) as unknown as IncomingMessage
    expect(isLoopbackRequest(from('127.0.0.1'))).toBe(true)
    expect(isLoopbackRequest(from('::1'))).toBe(true)
    expect(isLoopbackRequest(from('::ffff:127.0.0.1'))).toBe(true)
    expect(isLoopbackRequest(from('192.168.1.20'))).toBe(false)
    expect(isLoopbackRequest(from(undefined))).toBe(false)
  })
})
