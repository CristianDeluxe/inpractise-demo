import { describe, expect, it } from 'vitest'
import { diffOps } from './diffOps'

describe('diffOps', () => {
  it('keeps shared words and marks only the fillers removed', () => {
    expect(
      diffOps(
        ['innovated', 'in', 'uh', 'healthcare,'],
        ['innovated', 'in', 'healthcare,'],
      ),
    ).toEqual([
      { kind: 'equal', text: 'innovated' },
      { kind: 'equal', text: 'in' },
      { kind: 'removed', text: 'uh' },
      { kind: 'equal', text: 'healthcare,' },
    ])
  })

  it('shows a substitution as a removal then an addition', () => {
    expect(diffOps(['Sober'], ['Sovereign'])).toEqual([
      { kind: 'removed', text: 'Sober' },
      { kind: 'added', text: 'Sovereign' },
    ])
    expect(diffOps([], ['new'])).toEqual([{ kind: 'added', text: 'new' }])
  })
})
