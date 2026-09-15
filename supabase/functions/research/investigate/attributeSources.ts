import type { CitationSource } from '../citations/CitationSource.ts'
import type { SubQuestionEvidence } from './SubQuestionEvidence.ts'

/**
 * Every passage some step could read, keyed as the server ranks it, with the
 * sub-questions whose selection contained it. A passage two steps both kept
 * appears once, attributed to both.
 */
export function attributeSources(evidence: readonly SubQuestionEvidence[]) {
  const readable = new Map<string, CitationSource>()
  const attribution = new Map<string, number[]>()
  for (const entry of evidence)
    for (const source of entry.sources) {
      const key = `${source.documentId}:${source.revisionId}:${source.passageId}`
      readable.set(key, readable.get(key) ?? source)
      attribution.set(key, [
        ...(attribution.get(key) ?? []),
        entry.subQuestion.index,
      ])
    }
  return { readable, attribution }
}
