import type { CorrectionUsage } from '@/transcripts/contracts/CorrectionUsage.ts'

export function sumUsage(usages: readonly CorrectionUsage[]): CorrectionUsage {
  return {
    inputTokens: usages.reduce((sum, usage) => sum + usage.inputTokens, 0),
    outputTokens: usages.reduce((sum, usage) => sum + usage.outputTokens, 0),
  }
}
