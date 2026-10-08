import { writeFile } from 'node:fs/promises'
import { join } from 'node:path'
import { transcriptFolder } from './transcriptFolder.ts'

export async function writeReviewDecisions(id: string, decisions: unknown) {
  await writeFile(
    join(transcriptFolder(id), 'review.json'),
    `${JSON.stringify(decisions, null, 2)}\n`,
  )
}
