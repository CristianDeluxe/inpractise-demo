import type { MemoryEntry } from '@/transcripts/contracts/MemoryEntry.ts'
import type { MergedWord } from './MergedWord.ts'
import { normalizeWord } from './normalizeWord.ts'

/** Indexes of words where a glossary `from` (one to three words) begins. */
export function memoryStartIndexes(
  words: readonly MergedWord[],
  entries: readonly MemoryEntry[],
): Set<number> {
  const phrases = entries.map((entry) =>
    entry.from.split(/\s+/u).map((part) => normalizeWord(part)),
  )
  const hits = new Set<number>()
  words.forEach((_word, index) => {
    for (const phrase of phrases) {
      const matches = phrase.every(
        (part, offset) =>
          part !== '' &&
          normalizeWord(words[index + offset]?.text ?? '') === part,
      )
      if (matches) hits.add(index)
    }
  })
  return hits
}
