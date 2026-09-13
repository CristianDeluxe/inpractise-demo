import { mkdirSync, writeFileSync } from 'node:fs'
import type { CaseResult } from './CaseResult.ts'
import { summariseResults } from './summariseResults.ts'

/** The report carries case ids, statuses and counts. No questions, no passage
 *  text, no provider bodies: it is written to be shown to a reader. */
export function writeReport(
  results: readonly CaseResult[],
  path = 'evals/report.json',
) {
  const summary = summariseResults(results)
  mkdirSync('evals', { recursive: true })
  writeFileSync(
    path,
    `${JSON.stringify({ generatedAt: new Date().toISOString(), summary, results }, null, 2)}\n`,
  )
  return summary
}
