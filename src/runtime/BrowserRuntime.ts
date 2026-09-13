import type { ResearchClient } from '@/api/ResearchClient'
import type { SupabaseClient } from '@supabase/supabase-js'

export type BrowserRuntime = {
  auth: SupabaseClient['auth']
  client: ResearchClient
  events: EventTarget
  controllers: Set<AbortController>
}
