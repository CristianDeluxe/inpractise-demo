import type { Principal } from '../Principal.ts'

/**
 * Diagnostics follow the effective principal, not the real one: a reviewer
 * viewing as a member must not see them, which is what makes the downgrade
 * worth demonstrating.
 */
export function mayReadDiagnostics(principal: Principal) {
  return principal.role === 'reviewer' && principal.premium
}
