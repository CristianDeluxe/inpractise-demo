import { citationFixture } from '@/api/citationFixture'
import { describe, expect, it } from 'vitest'
import { conflictSides } from './conflictSides'

describe('conflictSides', () => {
  const supplier = {
    ...citationFixture(),
    citationId: 's3:rev-1:P3',
    documentId: 's3',
    passageId: 'P3',
    speaker: 'Dana Ferro (fictional)',
    speakerRole: 'Supplier operations lead',
    interviewDate: '2026-03-04',
  }
  const distributor = {
    ...citationFixture(),
    citationId: 's4:rev-1:P2',
    documentId: 's4',
    passageId: 'P2',
    speaker: 'Rui Almeida (fictional)',
    speakerRole: 'Distributor',
    interviewDate: '2026-08-19',
  }

  it('groups the claims by who gave the evidence, in first-appearance order', () => {
    const sides = conflictSides(
      [
        {
          text: 'Deliveries met the window.',
          citationIds: [supplier.citationId],
        },
        {
          text: 'Deliveries slipped by three weeks.',
          citationIds: [distributor.citationId],
        },
      ],
      [supplier, distributor],
    )
    expect(sides.map((side) => side.attribution)).toEqual([
      'Dana Ferro (fictional), Supplier operations lead',
      'Rui Almeida (fictional), Distributor',
    ])
    expect(sides[0]?.interviewDate).toBe('2026-03-04')
    expect(sides[1]?.claims).toHaveLength(1)
  })

  it('keeps two claims from the same speaker on one side', () => {
    const sides = conflictSides(
      [
        { text: 'First.', citationIds: [supplier.citationId] },
        { text: 'Second.', citationIds: [supplier.citationId] },
      ],
      [supplier],
    )
    expect(sides).toHaveLength(1)
    expect(sides[0]?.claims).toHaveLength(2)
  })

  it('falls back to the document title when a source has no named speaker', () => {
    const anonymous = {
      ...supplier,
      speaker: null,
      speakerRole: null,
      title: 'Harbor 10-K',
    }
    const sides = conflictSides(
      [{ text: 'Filed figure.', citationIds: [anonymous.citationId] }],
      [anonymous],
    )
    expect(sides[0]?.attribution).toBe('Harbor 10-K')
  })
})
