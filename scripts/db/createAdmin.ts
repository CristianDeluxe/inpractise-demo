import { createClient } from '@supabase/supabase-js'
import type { Database } from '../../supabase/functions/_shared/types/Database.ts'
import type { Target } from './Target.ts'

/**
 * Operator-only client for provisioning and corpus writes. Its secret key can
 * bypass caller restrictions, so this client must never enter browser, HTTP,
 * MCP or Edge retrieval paths; those use the authenticated member's token.
 */
export function createAdmin(target: Target) {
  return createClient<Database>(target.url, target.secretKey, {
    auth: { persistSession: false, autoRefreshToken: false },
    global: {
      fetch: async (input, init) =>
        fetch(input, { ...init, signal: AbortSignal.timeout(20000) }),
    },
  })
}
