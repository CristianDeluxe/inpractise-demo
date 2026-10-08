import type { CorrectionProvider } from '@/transcripts/contracts/CorrectionProvider.ts'

export type CorrectionOptions = {
  readonly id: string
  readonly provider: CorrectionProvider
  readonly model: string
  readonly limit: number | undefined
  readonly concurrency: number
}
