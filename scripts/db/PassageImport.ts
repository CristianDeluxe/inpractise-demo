import type { SupabaseClient } from '@supabase/supabase-js'
import type { Database } from '../../supabase/functions/_shared/types/Database.ts'
import type { CorpusDocument } from './CorpusDocument.ts'

export type PassageImport = {
  client: SupabaseClient<Database>
  document: CorpusDocument
  orgId: string
  indexMode: 'hybrid' | 'lexical_only'
}
