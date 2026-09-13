import { createClient } from '@supabase/supabase-js'
import { ApiError } from '../_shared/http/ApiError.ts'
import type { Database } from '../_shared/types/Database.ts'
import type { Principal } from './Principal.ts'
import { requireEnv } from './requireEnv.ts'
import { verifyToken } from './verifyToken.ts'

/**
 * `verify_jwt` is disabled on this function, so the token is validated here and
 * then forwarded: the database, not this code, decides what the caller may read.
 */
export async function authenticate(request: Request): Promise<Principal> {
  const header = request.headers.get('authorization')
  const token = header?.startsWith('Bearer ') ? header.slice(7) : null
  if (!token) throw new ApiError('unauthenticated', 'Missing bearer token')
  const url = requireEnv('SUPABASE_URL')
  const apiKey = requireEnv('SUPABASE_ANON_KEY')
  const userId = await verifyToken(url, apiKey, token)
  const client = createClient<Database>(url, apiKey, {
    auth: { persistSession: false, autoRefreshToken: false },
    global: { headers: { authorization: `Bearer ${token}` } },
  })
  const membership = await client
    .from('memberships')
    .select('org_id,role,premium,active')
    .maybeSingle()
  if (membership.error)
    throw new ApiError('dependency_failure', 'Membership read failed', true)
  if (!membership.data || !membership.data.active)
    throw new ApiError('forbidden', 'No active membership')
  return {
    userId,
    orgId: membership.data.org_id,
    role: membership.data.role,
    premium: membership.data.premium,
    client,
  }
}
