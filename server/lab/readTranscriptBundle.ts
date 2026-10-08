import { join } from 'node:path'
import { readJsonFile } from './readJsonFile.ts'
import { readReviewDecisions } from './readReviewDecisions.ts'
import { transcriptFolder } from './transcriptFolder.ts'

/** Null when the transcript does not exist. */
export async function readTranscriptBundle(id: string) {
  const folder = transcriptFolder(id)
  const transcript = await readJsonFile(join(folder, 'transcript.json'))
  if (transcript === null) return null
  return {
    transcript,
    correction: await readJsonFile(join(folder, 'correction.json')),
    review: await readReviewDecisions(id),
    peaks: await readJsonFile(join(folder, 'peaks.json')),
  }
}
