import type { CorrectionEditDraft } from './CorrectionEditDraft.ts'
import type { GlossaryMatch } from './GlossaryMatch.ts'

/** One edit per glossary entry that matched in the paragraph, at every offset it matched. */
export function memoryEditsFrom(
  paragraphId: string,
  matches: readonly GlossaryMatch[],
): CorrectionEditDraft[] {
  const seen = new Set<string>()
  const edits: CorrectionEditDraft[] = []
  for (const { entry } of matches) {
    if (seen.has(entry.from)) continue
    seen.add(entry.from)
    edits.push({
      paragraphId,
      from: entry.from,
      to: entry.to,
      category: entry.category,
      origin: 'memory',
      reason: `Learned from ${entry.sources.join(', ')}`,
      confidence: 1,
      at: matches
        .filter((match) => match.entry.from === entry.from)
        .map((match) => match.start),
    })
  }
  return edits
}
