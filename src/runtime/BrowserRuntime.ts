import type { ResearchClient } from '@/api/ResearchClient'
import type { SupabaseClient } from '@supabase/supabase-js'

export type BrowserRuntime = {
  auth: SupabaseClient['auth']
  client: ResearchClient
  /** Database and Storage reads and writes under the caller's JWT. */
  data: SupabaseClient
  events: EventTarget
  controllers: Set<AbortController>
}
