import { readMaxOAuthTokens } from '@cristiandeluxe/max-lane'
import { loadTarget } from '../../scripts/db/loadTarget.ts'
import { assertAnswerGate } from '../assertAnswerGate.ts'
import type { CaseResult } from '../CaseResult.ts'
import { loadGold } from '../loadGold.ts'
import { printLine } from '../printLine.ts'
import { reportPath } from '../reportPath.ts'
import { writeReport } from '../writeReport.ts'
import { runCase } from './runCase.ts'

/**
 * One live repetition of the whole gold set against the deployed function,
 * judged by an independent model. Cases run in sequence: the shared demo
 * allowance is finite and a parallel burst would spend it on retries.
 */
export async function runEvaluation() {
  const target = loadTarget()
  const tokens = await readMaxOAuthTokens()
  const results: CaseResult[] = []
  for (const goldCase of loadGold()) {
    const result = await runCase(target, tokens, goldCase)
    results.push(result)
    printLine(
      `${result.caseId} ${result.actualStatus} (expected ${result.expectedStatus}) recall@10=${String(result.goldRecallAt10)} grounded=${String(result.verdict.grounded)}`,
    )
  }
  const summary = writeReport(results, reportPath(process.argv))
  printLine(JSON.stringify(summary))
  assertAnswerGate(summary)
  printLine('PASS: answer gate')
}

await runEvaluation()
