import type { Citation } from '@/api/Citation'
import type { Claim } from '@/api/Claim'
import { citationAttribution } from './citationAttribution'
import type { ConflictSide } from './ConflictSide'

/**
 * A `conflict` answer is two accounts, not one list. Grouping the claims by the
 * attribution of their first citation puts each account beside the person and
 * the date it came from, which is the whole reason a reader asked.
 */
export function conflictSides(
  claims: readonly Claim[],
  citations: readonly Citation[],
): ConflictSide[] {
  const byId = new Map(
    citations.map((citation) => [citation.citationId, citation]),
  )
  const sides = new Map<
    string,
    { interviewDate: string | null; claims: Claim[] }
  >()
  for (const claim of claims) {
    const citation = claim.citationIds
      .map((id) => byId.get(id))
      .find((value) => value !== undefined)
    // Unreachable in practice: validateProviderAnswer.ts (lines 18-26) rejects
    // the whole answer before this runs if any claim cites an id outside the
    // supplied citations, so every claim here already resolves to a citation.
    if (!citation) continue
    const key = citationAttribution(citation)
    const side = sides.get(key)
    if (side) side.claims.push(claim)
    else
      sides.set(key, { interviewDate: citation.interviewDate, claims: [claim] })
  }
  return [...sides].map(([attribution, side]) => ({ attribution, ...side }))
}
