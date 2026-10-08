import { alignWords } from '../../scripts/transcripts/alignWords.ts'
import type { Hunk } from '../../scripts/transcripts/Hunk.ts'
import { splitWords } from '../../scripts/transcripts/splitWords.ts'

export function alignText(raw: string, final: string): Hunk[] {
  return alignWords(splitWords(raw), splitWords(final))
}
