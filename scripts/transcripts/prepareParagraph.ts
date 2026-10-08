import type { MemoryEntry } from '@/transcripts/contracts/MemoryEntry.ts'
import type { TranscriptParagraph } from '@/transcripts/contracts/TranscriptParagraph.ts'
import { applyReplacements } from './applyReplacements.ts'
import { findGlossaryMatches } from './findGlossaryMatches.ts'
import { glossaryReplacements } from './glossaryReplacements.ts'
import { markReplacements } from './markReplacements.ts'
import { memoryEditsFrom } from './memoryEditsFrom.ts'
import { paragraphText } from './paragraphText.ts'
import type { PreparedParagraph } from './PreparedParagraph.ts'

/** Memory pre-pass: whole-word substitution of glossary entries, then inline marks. */
export function prepareParagraph(
  paragraph: TranscriptParagraph,
  glossary: readonly MemoryEntry[],
): PreparedParagraph {
  const raw = paragraphText(paragraph)
  const matches = findGlossaryMatches(raw, glossary)
  const substitutions = glossaryReplacements(matches)
  return {
    id: paragraph.id,
    raw,
    text: applyReplacements(raw, substitutions),
    marked: applyReplacements(raw, [
      ...substitutions,
      ...markReplacements(paragraph, matches),
    ]),
    memoryEdits: memoryEditsFrom(paragraph.id, matches),
  }
}
