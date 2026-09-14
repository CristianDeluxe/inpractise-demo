import type { Principal } from './Principal.ts'
import type { ViewAs } from './ViewAs.ts'

export function effectivePrincipal(
  real: Principal,
  viewAs: ViewAs | undefined,
): Principal {
  return {
    ...real,
    role: viewAs?.role === 'member' ? 'member' : real.role,
    premium: real.premium && viewAs?.premium !== false,
  }
}
