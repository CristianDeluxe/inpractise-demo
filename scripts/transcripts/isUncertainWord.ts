import type { TranscriptWord } from '@/transcripts/contracts/TranscriptWord.ts'

/** Low band or entity flag: where the second pass should look hardest. */
export function isUncertainWord(word: TranscriptWord): boolean {
  return word.band === 'low' || word.flags.includes('entity')
}
