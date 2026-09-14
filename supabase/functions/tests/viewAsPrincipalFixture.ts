import { createClient } from '@supabase/supabase-js'
import type { Database } from '../_shared/types/Database.ts'
import type { Principal } from '../research/Principal.ts'

export function viewAsPrincipalFixture(
  fetcher: typeof fetch = globalThis.fetch,
): Principal {
  return {
    userId: 'test-user',
    orgId: 'org-a',
    role: 'reviewer',
    premium: true,
    client: createClient<Database>(
      'https://example.supabase.co',
      'test-public-key',
      {
        auth: { persistSession: false, autoRefreshToken: false },
        global: {
          fetch: fetcher,
          headers: { authorization: 'Bearer test-caller-token' },
        },
      },
    ),
  }
}
