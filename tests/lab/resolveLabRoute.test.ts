import { describe, expect, it } from 'vitest'
import { resolveLabRoute } from '../../server/lab/resolveLabRoute.ts'

describe('resolveLabRoute', () => {
  it('routes the fixed endpoints', () => {
    expect(resolveLabRoute('GET', '/local-api/transcripts')).toEqual({
      kind: 'list',
    })
    expect(resolveLabRoute('GET', '/local-api/memory')).toEqual({
      kind: 'memory',
    })
  })

  it('routes transcript resources only for their own method', () => {
    expect(
      resolveLabRoute('GET', '/local-api/transcripts/LQ6lAvNMjPE'),
    ).toEqual({ kind: 'bundle', id: 'LQ6lAvNMjPE' })
    expect(
      resolveLabRoute('PUT', '/local-api/transcripts/LQ6lAvNMjPE/review'),
    ).toEqual({ kind: 'review', id: 'LQ6lAvNMjPE' })
    expect(
      resolveLabRoute('GET', '/local-api/transcripts/LQ6lAvNMjPE/review'),
    ).toEqual({ kind: 'method-not-allowed' })
  })

  it('rejects ids that could traverse the filesystem', () => {
    expect(
      resolveLabRoute('GET', '/local-api/transcripts/..%2f..%2fetc'),
    ).toEqual({ kind: 'invalid-id' })
    expect(resolveLabRoute('GET', '/local-api/transcripts/short')).toEqual({
      kind: 'invalid-id',
    })
    expect(
      resolveLabRoute('GET', '/local-api/transcripts/a.b.c.d.e.f'),
    ).toEqual({
      kind: 'invalid-id',
    })
  })

  it('leaves other paths to Vite', () => {
    expect(resolveLabRoute('GET', '/assets/app.js')).toBeNull()
  })
})
