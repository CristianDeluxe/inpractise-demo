import type { Session } from '@supabase/supabase-js'

export const sessionFixture: Session = {
  access_token: 'test-token',
  refresh_token: 'refresh-test',
  expires_in: 3600,
  token_type: 'bearer',
  user: {
    id: 'demo',
    app_metadata: {},
    user_metadata: {},
    aud: 'authenticated',
    created_at: '2026-09-13',
  },
}
