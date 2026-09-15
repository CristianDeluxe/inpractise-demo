/**
 * The token bound one investigation may spend across planning, refinement and
 * synthesis. The environment override exists so a test can prove the bound is
 * enforced without a provider that reports thousands of tokens.
 */
export function investigateTokenBudget(): number {
  const configured = Number(Deno.env.get('INVESTIGATE_TOKEN_BUDGET'))
  return Number.isFinite(configured) && configured > 0 ? configured : 16_000
}
