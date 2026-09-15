import { describe, expect, it } from 'vitest'
import { comparePayloadFixture } from './comparePayloadFixture'
import { filingCitationFixture } from './filingCitationFixture'
import { parseCompareData } from './parseCompareData'

describe('parseCompareData', () => {
  it('accepts a grounded cross-reference', () => {
    expect(parseCompareData(comparePayloadFixture()).relations).toHaveLength(1)
  })
  it('rejects a quotation that does not occur in the cited passage', () => {
    const data = comparePayloadFixture({
      interviewClaim: { quote: 'Paraphrased evidence' },
    })
    expect(() => parseCompareData(data)).toThrow(/quotation/)
  })
  it('rejects a claim citing the other side', () => {
    const data = comparePayloadFixture({
      interviewClaim: { citationIds: [filingCitationFixture().citationId] },
    })
    expect(() => parseCompareData(data)).toThrow(/outside its side/)
  })
  it('rejects a relation naming an unpublished claim', () => {
    const data = comparePayloadFixture({
      relations: [
        { interviewClaimId: 'i2', filingClaimId: 'f1', relation: 'agrees' },
      ],
    })
    expect(() => parseCompareData(data)).toThrow(/not published/)
  })
  it('rejects a refusal that carries claims', () => {
    const data = comparePayloadFixture({ filingSide: { status: 'not_found' } })
    expect(() => parseCompareData(data)).toThrow(/status/)
  })
  it('rejects an undocumented key', () => {
    const data = comparePayloadFixture({ extra: { verdict: 'agree' } })
    expect(() => parseCompareData(data)).toThrow()
  })
})
