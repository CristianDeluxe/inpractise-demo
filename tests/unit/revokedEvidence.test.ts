import { describe, expect, it } from 'vitest'
import { buildAskResult } from '../../supabase/functions/research/answer/buildAskResult.ts'
import { citationSourceFixture } from '../helpers/citationSourceFixture.ts'
import { revokedAnswerFixture } from '../helpers/revokedAnswerFixture.ts'

describe('evidence revoked between retrieval and delivery', () => {
  it('drops the claim whose passage the caller can no longer read', () => {
    const answer = revokedAnswerFixture()
    const result = buildAskResult(
      answer,
      [
        citationSourceFixture({ passageId: 'P2' }),
        citationSourceFixture({ passageId: 'P3' }),
      ],
      new Set(['s2:rev-1:P3']),
    )
    expect(result.claims).toHaveLength(1)
    expect(result.claims[0]?.text).toBe(answer.claims[1]?.text)
    expect(result.citations.map((citation) => citation.citationId)).toEqual([
      's2:rev-1:P3',
    ])
  })

  it('refuses rather than returning prose when every passage is revoked', () => {
    const result = buildAskResult(
      revokedAnswerFixture(),
      [
        citationSourceFixture({ passageId: 'P2' }),
        citationSourceFixture({ passageId: 'P3' }),
      ],
      new Set(),
    )
    expect(result.status).toBe('not_found')
    expect([result.claims, result.citations]).toEqual([[], []])
    expect(JSON.stringify(result)).not.toContain('six week')
  })
})
