import type { Candidate } from '../../_shared/types/Candidate.ts'
import type { CitationSource } from '../citations/CitationSource.ts'
import { attributeSources } from './attributeSources.ts'
import { fitsContext } from './fitsContext.ts'
import type { MergedEvidence } from './MergedEvidence.ts'
import type { SubQuestionEvidence } from './SubQuestionEvidence.ts'

/**
 * Synthesis sees one context under the same caps as a standalone ask: at most
 * eight passages and 4000 tokens. Sub-questions take turns in rank order so no
 * part of the question monopolises the labels, a passage two steps both kept
 * is supplied once, and only passages the caller could read at fetch time are
 * candidates for the merge.
 */
export function mergeEvidence(
  evidence: readonly SubQuestionEvidence[],
): MergedEvidence {
  const { readable, attribution } = attributeSources(evidence)
  const queues = evidence.map((entry) =>
    entry.selected.filter((candidate) => readable.has(candidate.key)),
  )
  const candidates: Candidate[] = []
  const sources: CitationSource[] = []
  let tokens = 0
  while (queues.some((queue) => queue.length))
    for (const queue of queues) {
      const candidate = queue.shift()
      const source = candidate && readable.get(candidate.key)
      if (!candidate || !source || !fitsContext(candidate, candidates, tokens))
        continue
      candidates.push(candidate)
      sources.push(source)
      tokens += candidate.tokenCount
    }
  return {
    candidates,
    sources,
    attribution: new Map(
      candidates.map((kept) => [kept.key, attribution.get(kept.key) ?? []]),
    ),
  }
}
