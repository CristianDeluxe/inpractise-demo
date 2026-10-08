import type { CorrectionProvider } from '@/transcripts/contracts/CorrectionProvider.ts'

export function toProvider(value: string): CorrectionProvider {
  if (value === 'max-lane' || value === 'openai') return value
  throw new Error('--provider must be max-lane or openai')
}
