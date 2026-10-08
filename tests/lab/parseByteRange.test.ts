import { describe, expect, it } from 'vitest'
import { parseByteRange } from '../../server/lab/parseByteRange.ts'

describe('parseByteRange', () => {
  it('parses closed, open and suffix ranges', () => {
    expect(parseByteRange('bytes=0-99', 1000)).toEqual({ start: 0, end: 99 })
    expect(parseByteRange('bytes=500-', 1000)).toEqual({ start: 500, end: 999 })
    expect(parseByteRange('bytes=-100', 1000)).toEqual({ start: 900, end: 999 })
  })

  it('clamps the end to the file size', () => {
    expect(parseByteRange('bytes=900-5000', 1000)).toEqual({
      start: 900,
      end: 999,
    })
  })

  it('rejects absent, malformed and unsatisfiable ranges', () => {
    expect(parseByteRange(undefined, 1000)).toBeNull()
    expect(parseByteRange('bytes=-', 1000)).toBeNull()
    expect(parseByteRange('items=0-1', 1000)).toBeNull()
    expect(parseByteRange('bytes=2000-3000', 1000)).toBeNull()
    expect(parseByteRange('bytes=-0', 1000)).toBeNull()
  })
})
