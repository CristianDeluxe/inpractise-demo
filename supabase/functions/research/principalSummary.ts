import type { Principal } from './Principal.ts'

export function principalSummary(principal: Principal) {
  return {
    orgId: principal.orgId,
    role: principal.role,
    premium: principal.premium,
  }
}
