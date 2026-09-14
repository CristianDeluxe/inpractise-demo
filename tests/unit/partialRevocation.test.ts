import { describe, expect, it } from 'vitest'
import { buildAskResult } from '../../supabase/functions/research/answer/buildAskResult.ts'
import { citationSourceFixture } from '../helpers/citationSourceFixture.ts'
import { revokedAnswerFixture } from '../helpers/revokedAnswerFixture.ts'
import { secondCitationIdFixture } from '../helpers/secondCitationIdFixture.ts'

describe('complete evidence for each delivered claim', () => {
  it('drops a comparison when only one of its two sources survives', () => {
    const answer = revokedAnswerFixture()
    answer.claims[0] = {
      text: 'One deployment took six weeks, while the other took six months.',
      sources: [1, 2],
    }
    const result = buildAskResult(
      answer,
      [citationSourceFixture(), citationSourceFixture({ passageId: 'P3' })],
      new Set([secondCitationIdFixture]),
    )
    expect(result.claims).toEqual([
      { text: answer.claims[1]?.text, citationIds: [secondCitationIdFixture] },
    ])
    expect(result.citations.map((citation) => citation.citationId)).toEqual([
      secondCitationIdFixture,
    ])
  })

  it('preserves a multi-source claim only when every reference survives', () => {
    const answer = revokedAnswerFixture()
    answer.claims = [{ text: 'A supported comparison.', sources: [1, 2] }]
    const result = buildAskResult(
      answer,
      [citationSourceFixture(), citationSourceFixture({ passageId: 'P3' })],
      new Set(['s2:rev-1:P2', secondCitationIdFixture]),
    )
    expect(result.claims).toEqual([
      {
        text: 'A supported comparison.',
        citationIds: ['s2:rev-1:P2', secondCitationIdFixture],
      },
    ])
  })

  it('reports changed access when partial loss removes the final claim', () => {
    const answer = revokedAnswerFixture()
    answer.claims = [{ text: 'A comparison.', sources: [1, 2] }]
    const result = buildAskResult(
      answer,
      [citationSourceFixture(), citationSourceFixture({ passageId: 'P3' })],
      new Set(['s2:rev-1:P2']),
    )
    expect(result).toEqual({
      status: 'not_found',
      claims: [],
      citations: [],
      missingEvidence: ['Access to the supporting evidence changed.'],
    })
  })

  it.each([
    { missingEvidence: [] },
    { missingEvidence: ['The corpus does not establish future retention.'] },
  ])('preserves an ordinary refusal explanation: %j', ({ missingEvidence }) => {
    const result = buildAskResult(
      { status: 'not_found', claims: [], missingEvidence },
      [citationSourceFixture()],
      new Set(),
    )
    expect(result).toEqual({
      status: 'not_found',
      claims: [],
      citations: [],
      missingEvidence,
    })
  })
})
