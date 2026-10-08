import type { TranscriptStats } from '@/transcripts/contracts/TranscriptStats.ts'
import type { TranscriptWord } from '@/transcripts/contracts/TranscriptWord.ts'

export function buildStats(words: readonly TranscriptWord[]): TranscriptStats {
  return {
    words: words.length,
    high: words.filter((word) => word.band === 'high').length,
    medium: words.filter((word) => word.band === 'medium').length,
    low: words.filter((word) => word.band === 'low').length,
    flagged: words.filter((word) => word.flags.length > 0).length,
  }
}
