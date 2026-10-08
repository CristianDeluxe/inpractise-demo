import type { MemoryEntry } from '@/transcripts/contracts/MemoryEntry.ts'
import type { TranscriptWord } from '@/transcripts/contracts/TranscriptWord.ts'
import { bandFor } from './bandFor.ts'
import { flagWord } from './flagWord.ts'
import { memoryStartIndexes } from './memoryStartIndexes.ts'
import type { MergedWord } from './MergedWord.ts'

export function flagWords(
  words: readonly MergedWord[],
  glossary: readonly MemoryEntry[],
): TranscriptWord[] {
  const memoryHits = memoryStartIndexes(words, glossary)
  return words.map((word, index) => {
    const band = bandFor(word.confidence)
    return {
      text: word.text,
      start: word.start,
      end: word.end,
      confidence: word.confidence,
      band,
      flags: flagWord(word, band, words[index - 1], memoryHits.has(index)),
    }
  })
}
