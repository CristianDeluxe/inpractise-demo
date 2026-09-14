import type { Principal } from './Principal.ts'
import type { ViewAs } from './ViewAs.ts'

/**
 * Viewing restrictions preserve the authenticated user, organization and JWT.
 * The returned flags can only narrow access; handlers must apply the premium
 * restriction in their queries because the caller's database token is unchanged.
 */
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
