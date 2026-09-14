import type { Principal } from '../Principal.ts'
import { principalSummary } from '../principalSummary.ts'

export function handleMe(
  principal: Principal,
  realPrincipal: Principal = principal,
) {
  return {
    ...principalSummary(principal),
    realPrincipal: principalSummary(realPrincipal),
    effectivePrincipal: principalSummary(principal),
  }
}
