import type { CorrectionEditDraft } from './CorrectionEditDraft.ts'
import type { GlossaryMatch } from './GlossaryMatch.ts'

/** One edit per glossary entry that matched in the paragraph. */
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
    })
  }
  return edits
}
