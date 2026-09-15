import { describe, expect, it } from 'vitest'
import { investigationFixture } from './investigationFixture'
import { parseInvestigateData } from './parseInvestigateData'

describe('the investigation result parser', () => {
  it('accepts a grounded investigation with its sub-question breakdown', () => {
    const data = investigationFixture()
    const parsed = parseInvestigateData(data)
    expect(parsed.status).toBe('answered')
    expect(parsed.subQuestions).toHaveLength(1)
    expect(parsed.refinement).toBe('none')
  })
  it('rejects a claim citing evidence outside the supplied context', () => {
    const data = investigationFixture()
    expect(() =>
      parseInvestigateData({
        ...data,
        claims: [{ text: 'Claim', citationIds: ['foreign'] }],
      }),
    ).toThrow()
  })
  it('rejects more than four sub-questions', () => {
    const data = investigationFixture()
    const [first] = data.subQuestions
    const extra = Array.from({ length: 4 }, (_entry, index) => ({
      ...first,
      index: index + 2,
    }))
    expect(() =>
      parseInvestigateData({
        ...data,
        subQuestions: [...data.subQuestions, ...extra],
      }),
    ).toThrow()
  })
  it('rejects an unbounded refinement outcome', () => {
    const data = investigationFixture()
    expect(() =>
      parseInvestigateData({ ...data, refinement: 'retried' }),
    ).toThrow()
  })
  it('accepts an optional reviewer trace', () => {
    const data = investigationFixture()
    const citation = data.citations[0]
    if (!citation) throw new Error('The fixture must supply a citation')
    const parsed = parseInvestigateData({
      ...data,
      trace: {
        steps: [
          {
            step: 1,
            candidateAt10: [citation.citationId],
            selectedIds: [citation.citationId],
            selectedTokens: 120,
          },
        ],
      },
    })
    expect(parsed.trace?.steps).toHaveLength(1)
  })
})
