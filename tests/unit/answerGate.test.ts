import { describe, expect, it } from 'vitest'
import { assertAnswerGate } from '../../evals/assertAnswerGate.ts'
import { checkForbiddenStrings } from '../../evals/checkForbiddenStrings.ts'
import { diagnoseRetrieval } from '../../evals/diagnoseRetrieval.ts'
import { loadGold } from '../../evals/loadGold.ts'
import { summariseResults } from '../../evals/summariseResults.ts'
import { caseResultFixture } from '../helpers/caseResultFixture.ts'

describe('retrieval diagnosis', () => {
  it('separates a retrieval miss from a selection miss', () => {
    expect(diagnoseRetrieval(['g'], [], []).diagnosis).toBe('retrieval_miss')
    expect(diagnoseRetrieval(['g'], ['g'], []).diagnosis).toBe('selection_miss')
    expect(diagnoseRetrieval(['g'], ['g'], ['g']).diagnosis).toBe('pass')
  })
  it('accepts any one of several acceptable gold passages', () => {
    const result = diagnoseRetrieval(['a', 'b'], ['b'], ['b'])
    expect([result.diagnosis, result.recallAt10]).toEqual(['pass', true])
  })
  it('treats a refusal case as having nothing to recall', () => {
    expect(diagnoseRetrieval([], [], []).recallAt10).toBe(true)
  })
})

describe('the answer gate', () => {
  it('passes a clean run', () => {
    expect(() => {
      assertAnswerGate(summariseResults([caseResultFixture()]))
    }).not.toThrow()
  })
  it('fails on a leaked restricted string', () => {
    const leaked = caseResultFixture({ forbiddenStringsLeaked: ['ORCHID-74'] })
    expect(() => {
      assertAnswerGate(summariseResults([leaked]))
    }).toThrow(/restricted strings leaked/)
  })
  it('fails on an unauthorised citation and on an ungrounded answer', () => {
    expect(() => {
      assertAnswerGate(
        summariseResults([
          caseResultFixture({ citationsAllAuthorised: false }),
        ]),
      )
    }).toThrow(/unauthorised citations/)
    expect(() => {
      assertAnswerGate(
        summariseResults([
          caseResultFixture({
            verdict: { grounded: false, statusAppropriate: true, reason: 'no' },
          }),
        ]),
      )
    }).toThrow(/ungrounded/)
  })
  it('fails a refusal case the system answered instead', () => {
    expect(() => {
      assertAnswerGate(
        summariseResults([
          caseResultFixture({
            expectedStatus: 'not_found',
            actualStatus: 'answered',
            statusMatched: false,
          }),
        ]),
      )
    }).toThrow(/refusals 0\/1/)
  })
})

describe('the gold set', () => {
  it('loads with refusal cases carrying no gold evidence', () => {
    const cases = loadGold()
    expect(cases.length).toBeGreaterThan(10)
    for (const item of cases)
      expect(item.goldIds.length === 0).toBe(
        item.expectedStatus === 'not_found',
      )
  })
})

describe('forbidden strings', () => {
  it('finds a restricted label anywhere in the rendered answer', () => {
    const result = {
      status: 'answered' as const,
      claims: [{ text: 'The label was ORCHID-74.', citationIds: [] }],
      missingEvidence: [],
      citations: [],
      mode: 'hybrid',
      candidateCount: 1,
    }
    expect(checkForbiddenStrings(result, ['ORCHID-74', 'CEDAR-29'])).toEqual([
      'ORCHID-74',
    ])
  })
})
