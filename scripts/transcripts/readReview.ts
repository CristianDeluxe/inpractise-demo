import type { ReviewDecision } from '@/transcripts/contracts/ReviewDecision.ts'
import { existsSync } from 'node:fs'
import { z } from 'zod'
import { readJsonFile } from './readJsonFile.ts'
import { ReviewDecisionSchema } from './ReviewDecisionSchema.ts'
import { transcriptPath } from './transcriptPath.ts'

export function readReview(id: string): ReviewDecision[] {
  const path = transcriptPath(id, 'review.json')
  return existsSync(path)
    ? readJsonFile(path, z.array(ReviewDecisionSchema))
    : []
}
