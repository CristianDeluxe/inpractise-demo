import { join } from 'node:path'
import { readJsonFile } from './readJsonFile.ts'
import { reviewDecisionsSchema } from './reviewDecisionsSchema.ts'
import { transcriptFolder } from './transcriptFolder.ts'

export async function readReviewDecisions(id: string) {
  const parsed = reviewDecisionsSchema.safeParse(
    await readJsonFile(join(transcriptFolder(id), 'review.json')),
  )
  return parsed.success ? parsed.data : []
}
