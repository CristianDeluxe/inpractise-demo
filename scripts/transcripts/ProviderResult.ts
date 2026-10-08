import type { CorrectionUsage } from '@/transcripts/contracts/CorrectionUsage.ts'

export type ProviderResult = {
  readonly answer: unknown
  readonly usage: CorrectionUsage
}
