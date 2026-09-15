/** Looks a claim's text up by id within one side's published claims. A
 *  relation always names a claim the parser already proved was published,
 *  so an empty result here means the schemas drifted, not a real gap. */
export function findClaimText(
  claims: readonly { claimId: string; text: string }[],
  claimId: string,
): string {
  return claims.find((claim) => claim.claimId === claimId)?.text ?? ''
}
