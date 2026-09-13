import type { SupabaseClient } from '@supabase/supabase-js'
import type { Database } from '../_shared/types/Database.ts'

/**
 * The authenticated caller and a client that carries their token, so every
 * query below runs under row level security as that caller.
 */
export type Principal = {
  userId: string
  orgId: string
  role: string
  premium: boolean
  client: SupabaseClient<Database>
}
