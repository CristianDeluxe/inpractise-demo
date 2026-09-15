import type { Citation } from '@/api/Citation'

/** A recorded answered case rendered statically on the landing page. */
export type HeroAnswerRecord = {
  caseId: string
  recordedOn: string
  question: string
  claim: string
  citation: Citation
}
