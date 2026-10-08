import { describe, expect, it } from 'vitest'
import { modelEditStart } from '../../scripts/transcripts/modelEditStart.ts'
import { draftFixture } from './draftFixture.ts'

describe('modelEditStart', () => {
  it('pins the occurrence the model text changed despite an unreported change nearby', () => {
    expect(
      modelEditStart('foo and foo', draftFixture('foo', 'Bar'), 'foo plus Bar'),
    ).toBe(8)
  })

  it('uses the surrounding words when the diff cannot tell', () => {
    expect(
      modelEditStart(
        'a foo b foo c',
        draftFixture('foo', 'bar'),
        'a foo b bar c',
      ),
    ).toBe(8)
  })

  it('falls back to the first occurrence and reports none when absent', () => {
    expect(
      modelEditStart('foo and foo', draftFixture('foo', 'x'), 'unrelated'),
    ).toBe(0)
    expect(
      modelEditStart('abc', draftFixture('foo', 'x'), 'abc'),
    ).toBeUndefined()
  })
})
