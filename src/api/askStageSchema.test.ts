import { describe, expect, it } from 'vitest'
import { askStageSchema } from './askStageSchema'

describe('askStageSchema', () => {
  it('accepts a stage with no timing, for a server that has not deployed it yet', () => {
    expect(askStageSchema.parse({ phase: 'debited' }).phase).toBe('debited')
  })

  it('accepts a stage carrying its server-side elapsed time', () => {
    const stage = askStageSchema.parse({ phase: 'debited', elapsedMs: 42 })
    expect(stage).toEqual({ phase: 'debited', elapsedMs: 42 })
  })

  it('rejects a negative elapsed time', () => {
    expect(() =>
      askStageSchema.parse({ phase: 'debited', elapsedMs: -1 }),
    ).toThrow()
  })

  it('rejects an unknown extra field, per phase', () => {
    expect(() =>
      askStageSchema.parse({
        phase: 'verifying',
        citationCount: 1,
        prose: 'not allowed',
      }),
    ).toThrow()
  })
})
