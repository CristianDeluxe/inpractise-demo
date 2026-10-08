import { formatPairsReport } from './formatters/formatPairsReport.ts'
import { parsePairsArgs } from './parsePairsArgs.ts'
import { runPairs } from './runPairs.ts'

export function runPairsCommand(argv: readonly string[]): void {
  console.log(formatPairsReport(runPairs(parsePairsArgs(argv))))
}
