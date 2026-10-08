import type { CorrectionRun } from '@/transcripts/contracts/CorrectionRun.ts'
import { randomUUID } from 'node:crypto'
import type { ChunkOutcome } from './ChunkOutcome.ts'
import type { CorrectionOptions } from './CorrectionOptions.ts'
import { sumUsage } from './sumUsage.ts'

export function assembleRun(
  options: CorrectionOptions,
  startedAt: Date,
  glossaryEntries: number,
  outcomes: readonly ChunkOutcome[],
): CorrectionRun {
  return {
    id: randomUUID(),
    transcriptId: options.id,
    provider: options.provider,
    model: options.model,
    startedAt: startedAt.toISOString(),
    durationMs: Date.now() - startedAt.getTime(),
    usage: sumUsage(outcomes.map((outcome) => outcome.usage)),
    memory: {
      glossaryEntries,
      glossaryHits: outcomes.reduce(
        (sum, outcome) => sum + outcome.memoryHits,
        0,
      ),
      examplesUsed: outcomes.reduce(
        (sum, outcome) => sum + outcome.examplesUsed,
        0,
      ),
    },
    paragraphs: outcomes.flatMap((outcome) => outcome.paragraphs),
  }
}
