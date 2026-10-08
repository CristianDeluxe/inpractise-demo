import type { CaseResult } from './CaseResult.ts'
import { defaultGoldPath } from './defaultGoldPath.ts'
import { loadGold } from './loadGold.ts'

/**
 * A report that silently lost cases would pass every ratio in the summary,
 * because each ratio is computed from the cases that are present. Coverage is
 * therefore checked against the gold set rather than against itself.
 */
export function assertCaseCoverage(
  results: readonly CaseResult[],
  goldPath = defaultGoldPath,
): void {
  const expected = loadGold(goldPath).map((item) => item.caseId)
  const actual = results.map((item) => item.caseId)
  const missing = expected.filter((id) => !actual.includes(id))
  const unknown = actual.filter((id) => !expected.includes(id))
  if (missing.length || unknown.length)
    throw new Error(
      `FAIL: case coverage; missing ${missing.join(', ') || 'none'}; unknown ${unknown.join(', ') || 'none'}`,
    )
}
