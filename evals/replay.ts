import { printLine } from './printLine.ts'
import { replayReport } from './replayReport.ts'
import { retainedReportPaths } from './retainedReportPaths.ts'

/**
 * Credential-free entry point: anyone who clones the repository can check that
 * the retained reports still satisfy the gate that was applied to them.
 */
export function replayRetainedReports() {
  const paths = retainedReportPaths()
  if (!paths.length) throw new Error('FAIL: no retained reports found')
  for (const path of paths) {
    const { generatedAt, summary } = replayReport(path)
    printLine(
      `${path} ${generatedAt} statusMatched=${String(summary.statusMatched)}/${String(summary.cases)} accepted=${summary.statusMismatches.map((item) => item.caseId).join(',') || 'none'}`,
    )
  }
  printLine(
    'PASS: retained reports replay the gate. This checks stored consistency and gate behavior; it does not rerun retrieval or judging.',
  )
}

replayRetainedReports()
