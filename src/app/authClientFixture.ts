import { createClient } from '@supabase/supabase-js'

export function authClientFixture() {
  const { auth } = createClient(
    'https://example.supabase.co',
    'sb_publishable_test',
    {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
        detectSessionInUrl: false,
        storageKey: crypto.randomUUID(),
      },
    },
  )
  return auth
}
