import type { ClaimRowProps } from './ClaimRowProps'

export function claimSources({ claim, citations }: ClaimRowProps) {
  return citations.filter((citation) =>
    claim.citationIds.includes(citation.citationId),
  )
}
