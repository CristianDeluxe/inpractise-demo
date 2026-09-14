import { assertAnswerGate } from './assertAnswerGate.ts'
import { assertCaseCoverage } from './assertCaseCoverage.ts'
import { loadReport } from './loadReport.ts'
import { summariseResults } from './summariseResults.ts'

/**
 * Recomputes one retained report and puts it back through the gate. This
 * validates report consistency and gate behavior only: no retrieval runs and
 * no model judges anything, so it needs no credentials and proves nothing
 * about today's live quality.
 */
export function replayReport(path: string) {
  const report = loadReport(path)
  assertCaseCoverage(report.results)
  const summary = summariseResults(report.results)
  assertAnswerGate(summary)
  return { path, generatedAt: report.generatedAt, summary }
}
