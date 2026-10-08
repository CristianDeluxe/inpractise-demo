import type { CorrectionProvider } from '@/transcripts/contracts/CorrectionProvider.ts'
import { callMaxLane } from './callMaxLane.ts'
import { callOpenAi } from './callOpenAi.ts'
import type { ProviderRequest } from './ProviderRequest.ts'
import type { ProviderResult } from './ProviderResult.ts'

export async function requestCorrection(
  provider: CorrectionProvider,
  request: ProviderRequest,
): Promise<ProviderResult> {
  return provider === 'openai'
    ? await callOpenAi(request)
    : await callMaxLane(request)
}
