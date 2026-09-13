import type { Principal } from '../Principal.ts'

export function handleMe(principal: Principal) {
  return {
    orgId: principal.orgId,
    role: principal.role,
    premium: principal.premium,
  }
}
