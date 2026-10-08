import { join } from 'node:path'
import { countCorrectionEdits } from './countCorrectionEdits.ts'
import { readJsonFile } from './readJsonFile.ts'
import { readReviewDecisions } from './readReviewDecisions.ts'
import { transcriptFolder } from './transcriptFolder.ts'
import type { TranscriptHead } from './TranscriptHead.ts'

export async function summarizeTranscript(id: string) {
  const folder = transcriptFolder(id)
  const transcript = (await readJsonFile(
    join(folder, 'transcript.json'),
  )) as TranscriptHead | null
  if (transcript === null) return null
  const correction = await readJsonFile(join(folder, 'correction.json'))
  return {
    id,
    source: transcript.source,
    stats: transcript.stats,
    hasCorrection: correction !== null,
    edits: countCorrectionEdits(correction),
    reviewed: (await readReviewDecisions(id)).length,
  }
}
