import type { CorrectionRun } from '@/transcripts/contracts/CorrectionRun.ts'
import { tallyKeys } from './tallyKeys.ts'

export function summarizeRun(
  run: CorrectionRun,
  dropped: number,
  unreported: number,
): string {
  const edits = run.paragraphs.flatMap((paragraph) => paragraph.edits)
  return [
    `paragraphs: ${String(run.paragraphs.length)}`,
    `edits: ${String(edits.length)}`,
    `by category: ${tallyKeys(edits.map((edit) => edit.category))}`,
    `by origin: ${tallyKeys(edits.map((edit) => edit.origin))}`,
    `dropped invalid edits: ${String(dropped)}`,
    `discarded unreported word changes: ${String(unreported)}`,
    `memory: ${String(run.memory.glossaryEntries)} entries, ${String(run.memory.glossaryHits)} hits, ${String(run.memory.examplesUsed)} examples used`,
    `duration: ${(run.durationMs / 1000).toFixed(1)} s`,
    `tokens: ${String(run.usage.inputTokens)} in, ${String(run.usage.outputTokens)} out`,
  ].join('\n')
}
