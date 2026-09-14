import { describe, expect, it } from 'vitest'
import { assertAnswerGate } from '../../evals/assertAnswerGate.ts'
import { assertCaseCoverage } from '../../evals/assertCaseCoverage.ts'
import { loadGold } from '../../evals/loadGold.ts'
import { replayReport } from '../../evals/replayReport.ts'
import { retainedReportPaths } from '../../evals/retainedReportPaths.ts'
import { summariseResults } from '../../evals/summariseResults.ts'
import { acceptedF03Fixture } from '../helpers/acceptedF03Fixture.ts'
import { caseResultFixture } from '../helpers/caseResultFixture.ts'

describe('the gate refuses a system that refuses everything', () => {
  it('fails when evidence cases answer not_found', () => {
    const refusedEverything = ['G01', 'G02', 'G03'].map((caseId) =>
      caseResultFixture({
        caseId,
        actualStatus: 'not_found',
        statusMatched: false,
        goldInContext: false,
        diagnosis: 'selection_miss',
      }),
    )
    expect(() => {
      assertAnswerGate(summariseResults(refusedEverything))
    }).toThrow(/unexpected status mismatches/)
  })

  it('fails a new refusal even while the accepted F03 miss is unchanged', () => {
    expect(() => {
      assertAnswerGate(
        summariseResults([
          acceptedF03Fixture(),
          caseResultFixture({
            caseId: 'G02',
            actualStatus: 'not_found',
            statusMatched: false,
            goldInContext: false,
            diagnosis: 'selection_miss',
          }),
        ]),
      )
    }).toThrow(/G02 expected answered, got not_found/)
  })

  it('accepts the F03 signature and reports it', () => {
    const summary = summariseResults([
      caseResultFixture(),
      acceptedF03Fixture(),
    ])
    expect(() => {
      assertAnswerGate(summary)
    }).not.toThrow()
    expect(summary.statusMismatches).toEqual([
      {
        caseId: 'F03',
        expectedStatus: 'answered',
        actualStatus: 'not_found',
        diagnosis: 'selection_miss',
      },
    ])
  })

  it('rejects F03 failing a different way', () => {
    expect(() => {
      assertAnswerGate(
        summariseResults([
          caseResultFixture({
            caseId: 'F03',
            expectedStatus: 'answered',
            actualStatus: 'conflict',
            statusMatched: false,
            diagnosis: 'pass',
          }),
        ]),
      )
    }).toThrow(/F03 expected answered, got conflict/)
  })

  it('fails a wrong conflict or partial status', () => {
    for (const actualStatus of ['conflict', 'partial'])
      expect(() => {
        assertAnswerGate(
          summariseResults([
            caseResultFixture({ actualStatus, statusMatched: false }),
          ]),
        )
      }).toThrow(/unexpected status mismatches/)
  })

  it('fails an empty case set', () => {
    expect(() => {
      assertAnswerGate(summariseResults([]))
    }).toThrow(/no cases were evaluated/)
  })
})

describe('case coverage', () => {
  it('fails a report that lost cases or invented one', () => {
    expect(() => {
      assertCaseCoverage([caseResultFixture()])
    }).toThrow(/case coverage/)
    const complete = loadGold().map((item) =>
      caseResultFixture({
        caseId: item.caseId,
        expectedStatus: item.expectedStatus,
        actualStatus: item.expectedStatus,
      }),
    )
    expect(() => {
      assertCaseCoverage(complete)
    }).not.toThrow()
    expect(() => {
      assertCaseCoverage([...complete, caseResultFixture({ caseId: 'Z99' })])
    }).toThrow(/unknown Z99/)
  })
})

describe('the retained reports', () => {
  it('still satisfy the gate they were measured under', () => {
    const paths = retainedReportPaths()
    expect(paths.length).toBeGreaterThan(0)
    for (const path of paths) {
      const { summary } = replayReport(path)
      expect(summary.cases).toBe(loadGold().length)
      expect(summary.statusMismatches.map((item) => item.caseId)).toEqual([
        'F03',
      ])
    }
  })
})
