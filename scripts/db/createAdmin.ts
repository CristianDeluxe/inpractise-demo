import { createClient } from '@supabase/supabase-js'
import type { Database } from '../../supabase/functions/_shared/types/Database.ts'
import type { Target } from './Target.ts'

export function createAdmin(target: Target) {
  return createClient<Database>(target.url, target.secretKey, {
    auth: { persistSession: false, autoRefreshToken: false },
    global: {
      fetch: async (input, init) =>
        fetch(input, { ...init, signal: AbortSignal.timeout(20000) }),
    },
  })
}
