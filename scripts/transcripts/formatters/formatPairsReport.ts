import { hunkErrors } from '../hunkErrors.ts'
import type { PairsReport } from '../PairsReport.ts'
import { formatPercent } from './formatPercent.ts'

/** Plain-text summary: WER per pair and aggregate, hunk counts and the 15 most frequent hunks. */
export function formatPairsReport(report: PairsReport): string {
  const words = report.analyses.reduce(
    (total, analysis) => total + analysis.finalWords,
    0,
  )
  const errors = report.analyses.reduce(
    (total, analysis) =>
      total + analysis.hunks.reduce((sum, hunk) => sum + hunkErrors(hunk), 0),
    0,
  )
  const hunks = report.analyses.reduce(
    (total, analysis) => total + analysis.hunks.length,
    0,
  )
  const learnable = report.tallies.reduce(
    (total, item) => total + item.count,
    0,
  )
  const lines = [
    `pairs read: ${String(report.analyses.length)}${report.dryRun ? ' (dry run, nothing written)' : ''}`,
    `words (final reference): ${String(words)}`,
    ...report.analyses.map(
      (analysis) =>
        `  ${analysis.name}: WER ${formatPercent(analysis.wer)} (${String(analysis.hunks.length)} hunks, ${String(analysis.finalWords)} words)`,
    ),
    `aggregate WER: ${formatPercent(words === 0 ? 0 : errors / words)}`,
    `hunks: ${String(hunks)}; learnable hunks: ${String(learnable)}`,
    `glossary entries ${report.dryRun ? 'that would be written' : 'written'}: ${String(report.entriesWritten)}; examples ${report.dryRun ? 'that would be appended' : 'appended'}: ${String(report.examplesWritten)}`,
    'top hunks:',
    ...report.tallies
      .slice(0, 15)
      .map(
        (tally) =>
          `  "${tally.from}" -> "${tally.to}" x${String(tally.count)} (${tally.category})`,
      ),
  ]
  return lines.join('\n')
}
