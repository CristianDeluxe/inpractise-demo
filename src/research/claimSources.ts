import type { ClaimRowProps } from './ClaimRowProps'

/**
 * Assumes the answer parser already proved that every claim ID has a citation.
 * This display filter is not validation: used on unchecked data, it would silently
 * omit missing sources while leaving the claim's prose intact.
 */
export function claimSources({ claim, citations }: ClaimRowProps) {
  return citations.filter((citation) =>
    claim.citationIds.includes(citation.citationId),
  )
}
