import type { CorrectionRun } from '@/transcripts/contracts/CorrectionRun.ts'

export type CorrectionResult = {
  readonly run: CorrectionRun
  readonly dropped: number
  readonly unreported: number
}
